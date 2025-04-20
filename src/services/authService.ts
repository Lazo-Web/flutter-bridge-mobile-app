
import api from './api';
import { AuthResponse, LoginCredentials, RegisterData, User } from '../models/types';

const AUTH_TOKEN_KEY = 'auth_token';
const USER_KEY = 'user';

// Auth Service for handling authentication operations
const authService = {
  // Login user
  async login(credentials: LoginCredentials): Promise<User> {
    try {
      const response = await api.post<AuthResponse>('/login', credentials);
      this.setToken(response.token);
      this.setUser(response.user);
      return response.user;
    } catch (error) {
      throw error;
    }
  },
  
  // Register new user
  async register(data: RegisterData): Promise<User> {
    try {
      const response = await api.post<AuthResponse>('/register', data);
      this.setToken(response.token);
      this.setUser(response.user);
      return response.user;
    } catch (error) {
      throw error;
    }
  },
  
  // Logout user
  logout(): void {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    // Redirect to login
    window.location.href = '/login';
  },
  
  // Get current authenticated user
  async getCurrentUser(): Promise<User | null> {
    const storedUser = this.getUser();
    if (storedUser) {
      return storedUser;
    }
    
    // If we have a token but no user data, fetch the user
    if (this.getToken()) {
      try {
        const user = await api.get<User>('/user');
        this.setUser(user);
        return user;
      } catch (error) {
        this.logout();
        return null;
      }
    }
    
    return null;
  },
  
  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.getToken();
  },
  
  // Get stored auth token
  getToken(): string | null {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  },
  
  // Store auth token
  setToken(token: string): void {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
  },
  
  // Get stored user data
  getUser(): User | null {
    const userJson = localStorage.getItem(USER_KEY);
    if (userJson) {
      try {
        return JSON.parse(userJson);
      } catch (e) {
        return null;
      }
    }
    return null;
  },
  
  // Store user data
  setUser(user: User): void {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
};

export default authService;
