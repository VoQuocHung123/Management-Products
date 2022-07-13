import axios from './axios';

const productApi = {
  getbyPage: (query) => {
    const url = `products?${query}`;
    return axios.get(url);
  },
  getCategory: () => {
    const url = 'category';
    return axios.get(url);
  },
  postProduct: (formData) => {
    const url = 'products';
    return axios.post(url, formData);
  },
  deleteProduct: (id) => {
    const url = `products/${id}`;
    return axios.delete(url);
  },
  putProduct: (id, formData) => {
    const url = `products/${id}`;
    return axios.put(url, formData);
  },
};
export default productApi;
