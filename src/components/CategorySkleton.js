import React, { useEffect, useState, useRef } from 'react';
import { Skeleton } from './ui/skeleton';

export default function CategorySkeleton() {
  const [visibleCount, setVisibleCount] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const updateVisibleCount = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const itemWidth = 248; // Tailwind w-62 = 248px
        const gap = 20; // gap-5 = 1.25rem = 20px
        const totalItemWidth = itemWidth + gap;
        const maxItems = Math.floor((containerWidth + gap) / totalItemWidth);
        setVisibleCount(maxItems);
      }
    };

    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);
    return () => window.removeEventListener('resize', updateVisibleCount);
  }, []);

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex justify-between mt-2">
        <Skeleton className="w-32 h-8" />
        <Skeleton className="w-20 h-8" />
      </div>

      {/* 3 rows, only fully visible items rendered */}
      <div className="mt-4 space-y-4">
        {Array.from({ length: 3 }).map((_, rowIndex) => (
          <div
            key={rowIndex}
            ref={containerRef}
            className="w-full overflow-hidden"
          >
            <div className="flex gap-5">
              {Array.from({ length: 6 })
                .slice(0, visibleCount)
                .map((_, i) => (
                  <Skeleton
                    key={i}
                    className="w-62 h-90 flex-shrink-0"
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
