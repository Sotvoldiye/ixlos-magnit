'use client';

export default function TopNavbarSkeleton() {
  return (
    <header className="hidden md:flex bg-gray-200 h-36 animate-pulse">
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between py-2 px-6 gap-4">
        {/* Logo skeleton */}
        <div className="w-32 h-16 bg-gray-300 rounded-lg"></div>

        {/* Qidiruv paneli skeleton */}
        <div className="flex flex-grow items-center gap-4">
          <div className="flex flex-grow h-10 bg-gray-300 rounded-lg"></div>
        </div>

        {/* TopNavbar skeleton (avatar va ikonalar) */}
        <div className="flex items-center gap-6">
          {/* Avatar */}
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          {/* Saralangan va Saqlangan ikonalar */}
          <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
          <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </header>
  );
}