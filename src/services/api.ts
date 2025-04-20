// Base API URL - replace with your Laravel backend URL
const API_BASE_URL = 'https://hohbebujvilgllykpeas.supabase.co';

// Custom fetch API wrapper
const api = {
  // Function to get authorization headers
  getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
    
    const token = localStorage.getItem('auth_token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    return headers;
  },

  // GET request
  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: this.getHeaders()
    });
    
    if (!response.ok) {
      await this.handleResponseError(response);
    }
    
    return response.json();
  },

  // POST request
  async post<T>(endpoint: string, data: any): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      await this.handleResponseError(response);
    }
    
    return response.json();
  },

  // PUT request
  async put<T>(endpoint: string, data: any): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      await this.handleResponseError(response);
    }
    
    return response.json();
  },

  // DELETE request
  async delete<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: this.getHeaders()
    });
    
    if (!response.ok) {
      await this.handleResponseError(response);
    }
    
    return response.json();
  },

  // Handle response errors
  async handleResponseError(response: Response): Promise<never> {
    if (response.status === 401) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    
    // Try to get error message from response
    let errorMessage = 'An error occurred';
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch (e) {
      // If we can't parse the JSON, use status text
      errorMessage = response.statusText;
    }
    
    throw new Error(errorMessage);
  }
};

export default api;
