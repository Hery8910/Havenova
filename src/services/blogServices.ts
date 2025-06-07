import api from './api';
import { BlogPaginationResponse } from '../types/blog';

// TODOS LOS BLOGS
export const getAllBlogs = async (
  page: number,
  limit: number,
  search: string,
  order: string
): Promise<BlogPaginationResponse> => {
  const { data } = await api.get("/api/blogs", {
    params: { page, limit, search, order },
  });
  return data;
};

// BLOGS PROGRAMADOS
export const getScheduledBlogs = async (
  page: number,
  limit: number,
  search: string,
  order: string
): Promise<BlogPaginationResponse> => {
  const { data } = await api.get("/api/blogs/scheduled", {
    params: { page, limit, search, order },
  });
  return data;
};

// BLOGS PUBLICADOS
export const getPublishedBlogs = async (
  page: number,
  limit: number,
  search: string,
  order: string
): Promise<BlogPaginationResponse> => {
  const { data } = await api.get("/api/blogs/published", {
    params: { page, limit, search, order },
  });
  return data;
};

// BLOGS CON COMENTARIOS PENDIENTES DE RESPONDER
export const getPendingBlogs = async (
  page: number,
  limit: number,
  search: string,
  order: string
): Promise<BlogPaginationResponse> => {
  const { data } = await api.get("/api/blogs/pendingComments", {
    params: { page, limit, search, order },
  });
  return data;
};

// BORRAR BLOG POR ID
export async function deleteBlogById(id: string): Promise<void> {
  await api.delete(`/api/blogs/id/${id}`);
}
