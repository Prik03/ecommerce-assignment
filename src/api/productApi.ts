import axios from 'axios';

const api = axios.create({
  baseURL: 'https://dummyjson.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getProducts = async (limit = 12, skip = 0) => {
  const { data } = await api.get('/products', {
    params: {
      limit,
      skip,
    },
  });
  return data;
};

export const getProductById = async (id: number) => {
  const { data } = await api.get(`/products/${id}`);
  return data;
};
