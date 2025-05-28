import api from './api';
import { BlogPaginationResponse, BlogPost } from '../types/blog';


export const getAllBlogs = async (
  pageNum: number,
  limit: number
): Promise<BlogPaginationResponse> => {
  const { data } = await api.get(`/api/blogs?page=${pageNum}&limit=${limit}`);
  return data;
};

export async function deleteBlogById(id: string): Promise<void> {
  await api.delete(`/api/blogs/${id}`);
}