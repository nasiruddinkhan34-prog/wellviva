import api from "./axios";

export const fetchProducts = () => api.get("/products");
