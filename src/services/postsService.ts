
import api from './api';
import { FormResponse, Post } from '../models/types';

// Posts Service for handling post resources
const postsService = {
  // Get all posts
  async getPosts(): Promise<Post[]> {
    try {
      return await api.get<Post[]>('/posts');
    } catch (error) {
      throw error;
    }
  },
  
  // Get single post by ID
  async getPost(id: number): Promise<Post> {
    try {
      return await api.get<Post>(`/posts/${id}`);
    } catch (error) {
      throw error;
    }
  },
  
  // Create a new post
  async createPost(postData: Partial<Post>): Promise<Post> {
    try {
      return await api.post<Post>('/posts', postData);
    } catch (error) {
      throw error;
    }
  },
  
  // Update an existing post
  async updatePost(id: number, postData: Partial<Post>): Promise<Post> {
    try {
      return await api.put<Post>(`/posts/${id}`, postData);
    } catch (error) {
      throw error;
    }
  },
  
  // Delete a post
  async deletePost(id: number): Promise<FormResponse<null>> {
    try {
      return await api.delete<FormResponse<null>>(`/posts/${id}`);
    } catch (error) {
      throw error;
    }
  }
};

export default postsService;
