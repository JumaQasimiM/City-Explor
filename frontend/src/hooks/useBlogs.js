import { useFetch } from "./useFetch";
import { ApiUrl } from "../api/ApiUrl";
export const useBlogs = () => {
  const { data = [], error, loading, refetch } = useFetch(`${ApiUrl}/blogs`);

  return {
    blogs: data,
    loading,
    error,
    hasBlog: data.length > 0,
    refetch,
  };
};

// get blog by id
export const useBlogById = (blog_id) => {
  return useFetch(blog_id ? `${ApiUrl}/blogs/${blog_id}` : null);
};

// Get the owner of a place (user)
export const useBlogAuthor = (user_id) => {
  return useFetch(user_id ? `${ApiUrl}/users/${user_id}` : null);
};

// Get the owner of a place (user)
export const useBlogCategory = (cate_id) => {
  return useFetch(cate_id ? `${ApiUrl}/categories/${cate_id}` : null);
};
