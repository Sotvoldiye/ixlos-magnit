'use client';

import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { logout } from '@/lib/slice/Slice';
import { useRouter } from 'next/navigation';

export default function TopNavbar() {


const user = useSelector((state) => state.user);
  const favoriteCount = useSelector((state) => state.favorute?.items?.length || 0); // Typo tuzatildi
  const bagCount = useSelector((state) => state.bags?.items?.length || 0);
  const [avatarColor, setAvatarColor] = useState('#ccc');
  const dispatch = useDispatch();
  const router = useRouter();
const userData = useSelector((state) => state.user.user);
const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  const getRandomColor = () => {
    const colors = ['#f87171', '#60a5fa', '#34d399', '#fbbf24', '#a78bfa', '#f472b6', '#f97316'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  useEffect(() => {
    const savedColor = localStorage.getItem('avatarColor');
    if (savedColor) {
      setAvatarColor(savedColor);
    } else if (user) {
      const color = getRandomColor();
      setAvatarColor(color);
      localStorage.setItem('avatarColor', color);
    }
  }, [user]);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('avatarColor');
    router.push('/Auth');
  };
const usreArr = user?.user
const namearr = usreArr?.user
const firstLetter = namearr?.username?.charAt(0)?.toUpperCase() || '';
  return (
    <div className=" sm:flex lg:flex hidden md:flex items-center gap-6">
      {/* Avatar va User */}
      <div>
        {usreArr ? (
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-sm"
              style={{ backgroundColor: avatarColor }}
            >
              {firstLetter}
            </div>
            <span className="text-sm font-medium text-gray-900">{namearr?.username}</span>
          </div>
        ) : (
          <Link
            href="/Auth"
            className="flex items-center gap-2 text-sm text-gray-700 hover:text-green-600 transition-colors"
          >
            <i className="fas fa-user text-lg" />
            <span>Kirish</span>
          </Link>
        )}
      </div>

      {/* Saralangan va Saqlangan */}
      <div className="flex items-center gap-6">
        <Link href="/saralangan" className="relative text-gray-700 hover:text-green-600 transition-colors">
          <i className="fa-solid fa-heart text-lg" />
          {favoriteCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {favoriteCount}
            </span>
          )}
        </Link>

        <Link href="/saqlangan" className="relative text-gray-700 hover:text-green-600 transition-colors">
          <i className="fa-solid fa-shopping-cart text-lg" />
          {bagCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {bagCount}
            </span>
          )}
        </Link>

        {user && (
          <button
            onClick={handleLogout}
            className="text-red-500 hover:text-red-600 transition-colors"
            aria-label="Chiqish"
            title="Chiqish"
          >
            <i className="fa-solid fa-right-from-bracket text-lg" />
          </button>
        )}
      </div>
    </div>
  );
}