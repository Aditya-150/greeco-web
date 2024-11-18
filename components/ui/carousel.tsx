/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Define interface for carousel props
interface CarouselProps {
  items: Array<{ id: number; src: string; name: string }>;
  showDots?: boolean;
  itemsPerView?: {
    default: number;
    sm?: number;
    md?: number;
    lg?: number;
  };
  gap?: number;
  continuous?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  infinite?: boolean; // New prop to enable infinite looping
}

const Carousel = ({
  items,
  showDots = true,
  itemsPerView = {
    default: 1,
    sm: 1,
    md: 2,
    lg: 3,
  },
  gap = 20,
  continuous = false,
  autoPlay = false,
  autoPlayInterval = 3000,
  infinite = false, // default is false
}: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(infinite ? 1 : 0); // Start at 1 for seamless infinite scroll
  const [direction, setDirection] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [itemsPerViewCount, setItemsPerViewCount] = useState(
    itemsPerView.default
  );

  // Ensure the component is mounted before rendering
  useEffect(() => {
    setMounted(true);
  }, []);

  // Calculate items per view based on screen size
  useEffect(() => {
    const calculateItemsPerView = () => {
      if (typeof window === "undefined") return itemsPerView.default;

      const width = window.innerWidth;
      if (width >= 1024 && itemsPerView.lg) return itemsPerView.lg;
      if (width >= 768 && itemsPerView.md) return itemsPerView.md;
      if (width >= 640 && itemsPerView.sm) return itemsPerView.sm;
      return itemsPerView.default;
    };

    // Set the initial itemsPerView count
    setItemsPerViewCount(calculateItemsPerView());

    // Handle window resize to adjust itemsPerView dynamically
    const handleResize = () => {
      setItemsPerViewCount(calculateItemsPerView());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [itemsPerView]);

  // Create duplicate items for infinite scrolling
  const extendedItems = infinite
    ? [items[items.length - 1], ...items, items[0]] // Duplicate first and last items
    : items;

  // Calculate total slides needed based on items per view
  const totalSlides = Math.ceil(items.length / itemsPerViewCount);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let newIndex = prevIndex + newDirection;

      if (infinite) {
        if (newIndex === 0) {
          setTimeout(() => setCurrentIndex(totalSlides), 300); // Jump to the last real item
          return totalSlides - 1; // Show the duplicate end item momentarily
        }
        if (newIndex >= totalSlides + 1) {
          setTimeout(() => setCurrentIndex(1), 300); // Jump to the first real item
          return 1; // Show the duplicate start item momentarily
        }
      } else {
        if (newIndex >= totalSlides) newIndex = 0;
        if (newIndex < 0) newIndex = totalSlides - 1;
      }

      return newIndex;
    });
  };

  // Get visible items for current slide
  const getVisibleItems = () => {
    const startIndex = currentIndex * itemsPerViewCount;
    return extendedItems.slice(startIndex, startIndex + itemsPerViewCount);
  };

  // Auto play functionality
  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      paginate(1);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [currentIndex, autoPlay, autoPlayInterval]);

  // If the component isn't mounted, don't render anything to avoid hydration issues
  if (!mounted) return null;

  return (
    <div className="relative w-full max-w-6xl mx-auto px-4">
      <div
        className={`relative h-64 overflow-hidden rounded-lg ${
          continuous ? "overflow-visible" : "overflow-hidden"
        }`}
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="absolute w-full h-full flex"
            style={{ gap: `${gap}px` }}
          >
            {getVisibleItems().map((image) => (
              <div
                key={image.id}
                className={`relative ${
                  continuous
                    ? "flex-shrink-0 w-[calc(100%/var(--items-per-view)-var(--gap))]"
                    : `flex-1`
                }`}
                style={{
                  width: `calc(100% / ${itemsPerViewCount} - ${gap}px)`,
                  gap: `${gap}px`,
                }}
              >
                <img
                  src={image.src}
                  alt={image.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={() => paginate(-1)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Previous
        </button>
        <button
          onClick={() => paginate(1)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Next
        </button>
      </div>

      {showDots && (
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? "bg-blue-500" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;
