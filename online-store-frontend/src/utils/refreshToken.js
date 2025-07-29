import api from '../api/axios';

export const refreshToken = async () => {
  const refresh = localStorage.getItem('refresh');
  if (!refresh) throw new Error('No refresh token');

  const res = await api.post('token/refresh/', { refresh });
  localStorage.setItem('access', res.data.access);
  return res.data.access;
};
