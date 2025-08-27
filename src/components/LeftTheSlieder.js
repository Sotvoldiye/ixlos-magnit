import { logout } from '@/lib/slice/Slice';
import Link from 'next/link';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function LeftTheSlieder() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch()
    const handleLogout = () => {
      dispatch(logout());
      localStorage.removeItem("avatarColor");
    };
  return (
    <div>
         
      {user ?<div className="grid grid-cols-2 grid-rows-2 gap-2 bg-gradient-to-t from-emerald-600 to-emerald-300 p-4 sm:rounded-xl shadow-md">
  <Link href="/saqlangan" className="flex justify-center items-center">
    <i className="fas fa-heart p-3 bg-white rounded-sm text-emerald-600 hover:text-emerald-800 transition duration-200"></i>
  </Link>
  <Link href="/saralangan" className="flex justify-center items-center">
    <i className="fas fa-shopping-cart p-3 bg-white rounded-sm text-emerald-600 hover:text-emerald-800 transition duration-200"></i>
  </Link>
  {user && (
    <div className="flex justify-center items-center">
      <i
        className="fa-solid fa-right-from-bracket p-3  bg-white rounded-sm text-emerald-600 hover:text-emerald-800 cursor-pointer transition duration-200"
        title="Chiqish"
        onClick={handleLogout}
      ></i>
    </div>
  )}
  {/* To'ldiruvchi element, agar uchinchi qator kerak bo'lsa */}
  <div className="hidden sm:block"></div>
</div> :          <div className="flex flex-col gap-2 bg-gradient-to-t from-green-600 to-green-300 p-4 rounded-lg">
            <h2 className='text-center text-gray-100'>
Xush kelibsiz</h2>
<p className='text-center'>Barcha xususiyatlardan foydalanish uchun tizimga kiring</p>
            <button className="bg-white w-full py-2 rounded-md">
              Ro&apos;yhatdan o&apos;tish
            </button>
            <button className="bg-green-300 w-full py-2 text-green-900 rounded-md">
              Kirish
            </button>
          </div>}
              <div className="">
          <h2 className="text-md font-semibold mt-2">Bizning manzil</h2>
          <div className="w-full h-[100px] md:h-[150px] border rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d438.1298840559702!2d71.77127618894062!3d40.32733436605042!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38bb854baca1ca87%3A0x27350b2e2c0ed92d!2z0LzQuNC90Lgg0LzQsNGA0LrQtdGCINCc0LDQs9C90LjRgg!5e1!3m2!1sru!2s!4v1751957963658!5m2!1sru!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
          </div>
          </div>
    </div>
  )
}
