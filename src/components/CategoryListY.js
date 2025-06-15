import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import Link from 'next/link'

export default function CategoryListY({categories}) {
  return (
    <DropdownMenu>
    <DropdownMenuTrigger className="focus:outline-none text-sm text-gray-700">
      Hamma Kategoriyalar
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuLabel>Kategoriyalar</DropdownMenuLabel>
      <DropdownMenuSeparator />
      {categories.map((cat) => (
        <DropdownMenuItem key={cat}>
          <Link href={`/category/${cat}`}>{cat.slice(0, 1).toUpperCase() + cat.slice(1,)}</Link>
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  </DropdownMenu>  )
}
