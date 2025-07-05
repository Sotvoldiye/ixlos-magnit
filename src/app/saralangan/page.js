"use client";
import Cards from '@/components/Cards';
import Help_Report from '@/components/Help&Report';
import { removeFavorute, setFavoruteItems } from '@/lib/slice/Slice';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaBullseye } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

export default function FavoritePage() {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorute.items);
  const [hydrated, setHydrated] = useState(false);
  const [helpReport, setHelpReport] =useState(FaBullseye)
  useEffect(() => {
    if (hydrated) {
      localStorage.setItem("favorite", JSON.stringify(favorites));
    }
  }, [favorites, hydrated]);
  
  useEffect(() => {
    const stored = localStorage.getItem("favorite");
    if (stored) {
      dispatch(setFavoruteItems(JSON.parse(stored)));
    }
    setHydrated(true);
  }, [dispatch]);
  if (!hydrated) return <p>Yuklanmoqda...</p>;

  if (favorites.length === 0) {
    return <p>Saqlangan mahsulotlar yo&#39;q</p>;
  }
  const toggleHelp = (e) => {
    e.preventDefault();
    setHelpReport((prev) => !prev);
  };


  return (
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 px-4 py-6">
  {favorites.map((item) => {
      const isFavorited = favorites.some((fav) => fav.id === item.id);

      const toggleFavorite = (e) => {
        e.preventDefault();
        if (isFavorited) {
          dispatch(removeFavorute({ id: item.id }));
        } else {
          dispatch(addFavorute(item));
        }
      };
 return (
    <div
      key={item.id}
      className="bg-white shadow-md rounded-xl overflow-hidden border hover:shadow-lg transition px-2 py-2"
    >
     <div className="flex p-o flex-col relative w-full rounded-lg transition">
      <div className="relative w-full">
        {/* Favorite icon */}
        <i
          className={`text-xl absolute right-2 z-10 cursor-pointer 
            ${
            isFavorited
              ? "fas fa-heart text-red-500 scale-110"
              : "far fa-heart text-gray-700 hover:text-red-400"
          }`}
        
          onClick={toggleFavorite}
        ></i>

        {/* Rasm */}
        <Link href={`/product/${item.id}`}>
          <Image
            src={item?.thumbnail}
            alt={item?.title}
            width={300}
            height={300}
            className="w-full h-[200px] object-cover rounded-md"
          />
        </Link>
      </div>

      {/* Mahsulot nomi va narxi */}
      <Link href={`/product/${item.id}`}>
        <p className="text-sm font-medium text-gray-800 line-clamp-1">{item?.title}</p>
        <p className="text-[15px] text-gray-900 font-semibold">{item?.price} so&#39;m</p>
      </Link>

      {/* Ellipsis va modal */}
      <div className="relative self-end">
        {/* {helpReport && (
          <div
            // ref={helpRef}
            className="w-full absolute bottom-full right-0 bg-white shadow-lg border rounded-md z-30"
          >
            <Help_Report />
          </div>
        )} */}

        <i
          // ref={ellipsisRef}
          // onClick={toggleHelp}
          className="fa-solid fa-ellipsis-vertical text-[18px] text-gray-700 hover:bg-gray-200 py-[5px] px-[10px] rounded-full cursor-pointer transition"
        ></i>
      </div>
    </div>
      </div>
  )})}
</div>

  )
}
