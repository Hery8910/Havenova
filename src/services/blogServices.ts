import api from './api';
import { BlogPost } from '../types/blog';

export const getAllBlogs = async (): Promise<BlogPost[]> => {
  const { data } = await api.get<BlogPost[]>('/blogs');
  return data;
};
