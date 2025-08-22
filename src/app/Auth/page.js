import Login from '@/components/Login'
import Register from '@/components/Register'
import React from 'react'

export default function Auth() {
  return (
    <div className="flex items-center justify-center bg-gray-50 p-6">
      <div className="flex gap-12 bg-white shadow-lg rounded-xl p-10">
        {/* Login qismi */}
        <div className="w-[300px]">
          <Login />
        </div>

        {/* Register qismi */}
        <div className="w-[300px] border-l border-gray-200 pl-8">
          <Register />
        </div>
      </div>
    </div>
  )
}
