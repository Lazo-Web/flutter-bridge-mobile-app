
// User model
export interface User {
  id: number;
  name: string;
  email: string;
  created_at?: string;
  updated_at?: string;
}

// Auth related types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// Post model (example resource)
export interface Post {
  id: number;
  title: string;
  content: string;
  user_id: number;
  created_at?: string;
  updated_at?: string;
  user?: User;
}

// Form submission response
export interface FormResponse<T> {
  data: T;
  message: string;
}

// API error response
export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}
