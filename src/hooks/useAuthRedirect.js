// src/hooks/useAuth.js
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useGetMeQuery } from '@/lib/api/productApi';
import { login, logout } from '@/lib/slice/Slice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.user.user);
  const token = Cookies.get('token');

  const { data: userData, isLoading, error } = useGetMeQuery(undefined, {
    skip: !token,
  });

  useEffect(() => {
    if (token) {
      // Agar token bor va user ma'lumotlari mavjud bo'lsa
      if (userData && !user) {
        dispatch(login({ user: userData }));
      }
      
      // Agar xato bo'lsa (masalan, token yaroqsiz)
      if (error) {
        console.error('Authentication error:', error);
        Cookies.remove('token');
        dispatch(logout());
      }
    } else if (user) {
      // Agar token yo'qolgan bo'lsa, lekin user state'da bor
      dispatch(logout());
    }
  }, [token, userData, error, dispatch, user]);

  return { 
    user, 
    isLoading, 
    isAuthenticated: !!user,
    token 
  };
};