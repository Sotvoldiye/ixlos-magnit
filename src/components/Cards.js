"use client";
import { addFavorute, favoruteReducer, removeFavorute } from "@/lib/slice/Slice";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

export default function Cards({ item }) {
  const [active, setActive] = useState(false);
const dispatch = useDispatch()
  return (
    <Link href={`/product/${item.id}`} className="flex flex-col">
        <div className="relative w-full">
        <i
            className={`text-xl absolute right-2 top-2 z-10 ${active ? "fas fa-heart text-red-500 scale-110" : "far fa-heart text-black scale-100"}`}
            onClick={(e) => {
              e.preventDefault(); 
              setActive(!active);
              if(!active){
                dispatch(addFavorute(item))
              }else{
                dispatch(removeFavorute(item)
              )
            }}}
          ></i>

<Image
  src={item?.thumbnail}
  alt={item?.title}
  width={300}
  height={300}
  className="w-full object-cover rounded-md mb-2"
/>

</div>

<p className="text-sm text-start line-clamp-1">{item?.title}</p>
<p>{item?.price} so&apos;m</p>
<i className="fa-solid fa-ellipsis-vertical items-end ml-auto"></i> 
   </Link>
  );
}