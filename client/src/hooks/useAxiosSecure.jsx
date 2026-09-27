import { useMemo } from 'react'
import axios from 'axios'
import useAuth from './useAuth'

export default function useAxiosSecure() {
  const { user, signOutUser } = useAuth();

  const axiosInstance = useMemo(() => {
    const instance = axios.create({
      baseURL: import.meta.env.VITE_API_URL
    });

    instance.interceptors.request.use(async config => {
      if (user) {
        const token = await user.getIdToken();
        config.headers.authorization = `Bearer ${token}`;
      }
      return config;
    });

    instance.interceptors.response.use(
      response => response,
      error => {
        const status = error.response?.status;
        if (status === 401) {
          signOutUser()
            .then(() => alert('Session expired, please sign in again'))
            .catch(err => alert(err));
        }
        return Promise.reject(error);
      }
    );

    return instance;
  }, [user, signOutUser]);

  return axiosInstance;
}