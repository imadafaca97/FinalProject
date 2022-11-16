import axios from 'axios' ;

const httpClient = axios.create({
  baseURL: `localHost:3000/api/`,
  headers: { 'Content-Type': 'application/json' },
});

httpClient.interceptors.request.use((request) => {
  const token = sessionStorage.getItem('token');

  if (token) {
    request.headers!.Authorization = `Bearer ${token}`;
  }

  return request;
});

export default httpClient;
