// src/components/RootRedirect.js
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useGetMeQuery } from '@/lib/api/productApi';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '@/lib/slice/Slice';

export default function RootRedirect({ children }) {
  const router = useRouter();
  const dispatch = useDispatch();
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
    }
  }, [token, userData, error, dispatch, user]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return children;
}