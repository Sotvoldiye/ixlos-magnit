import Link from 'next/link'
import React from 'react'

export default function TopNavbar() {
  return (
    <div className='md:px-8 flex justify-between'>
          <div className='flex justify-between items-center'>
     <div className='flex items-center gap-2 text-[12px]'>
        <p>Salom </p> 
        <Link className="text-[12px] underline text-blue-600" href="/login">Kirish</Link>
        <p>yoki</p>
        <Link className='text-[12px] underline text-blue-600' href="/register">Ro&apos;yxatdan o&apos;tish</Link>
    </div>
    <div className='flex items-center gap-2 text-[12px]'>
        <Link href="/dailyDeals">Kunlik aksiyalar</Link>
        <Link href=''>Qo&apos;llab quvatlash/Aloqa</Link>

    </div>
   </div>
   <div className='flex gap-3'>
   <i className="fa-solid fa-bell"></i>
   <i className="fas fa-shopping-cart"></i> 
   </div>
    </div>
)
}
