import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000"
})

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
  }

  return req;
})

export const fetchPosts = (page) => API.get(`/posts?page=${page}`);

export const fetchPost = (id) => API.get(`/posts/${id}`); // get a single post

export const createPost = (newPost) => API.post('/posts', newPost);

export const updatePost = (id, updatedPost) =>
  API.patch(`/posts/${id}`, updatedPost); // patch is used for updating existing documents

export const deletePost = (id) => API.delete(`/posts/${id}`);

export const likePost = (id) => API.patch(`/posts/likePost/${id}`);

export const signin = (formData) => API.post('/user/signin', formData);

export const signup = (formData) => API.post('/user/signup', formData);

export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);

export const comment = (comment, postId) => API.post(`/posts/${postId}/commentPost`, { comment });
