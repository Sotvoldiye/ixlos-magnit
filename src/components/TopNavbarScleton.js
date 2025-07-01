import React from 'react'
import { Skeleton } from './ui/skeleton'

export default function TopNavbarScleton() {
    
  return (
    <div className="flex gap-5 flex-col my-4 mx-4">
<div className="flex gap-[40%]">
<Skeleton className="w-[40%] h-4"/>
<Skeleton className="w-[20%] h-4"/>
</div>
<div className="flex gap-[1%]">
    <Skeleton className="w-[13%] h-10"/>
    <Skeleton className="w-[77%] h-10"/>
    <Skeleton className="w-[8%] h-10"/>
</div>
<div>
   <Skeleton className="w-[100%] h-8"/>
</div>
    </div>
  )
}
