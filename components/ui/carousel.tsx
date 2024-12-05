/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

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
  infinite?: boolean;
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
  infinite = false,
}: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [itemsPerViewCount, setItemsPerViewCount] = useState(
    itemsPerView.default
  );

  const cloneItems = useCallback(() => {
    if (!infinite) return items;
    const beforeItems = items.slice(-itemsPerViewCount);
    const afterItems = items.slice(0, itemsPerViewCount);

    return [
      ...beforeItems.map((item) => ({ ...item, id: `before-${item.id}` })),
      ...items,
      ...afterItems.map((item) => ({ ...item, id: `after-${item.id}` })),
    ];
  }, [items, infinite, itemsPerViewCount]);

  const [extendedItems, setExtendedItems] = useState(cloneItems());

  useEffect(() => {
    setExtendedItems(cloneItems());
  }, [cloneItems, itemsPerViewCount]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const calculateItemsPerView = () => {
      if (typeof window === "undefined") return itemsPerView.default;
      const width = window.innerWidth;
      if (width >= 1024 && itemsPerView.lg) return itemsPerView.lg;
      if (width >= 768 && itemsPerView.md) return itemsPerView.md;
      if (width >= 640 && itemsPerView.sm) return itemsPerView.sm;
      return itemsPerView.default;
    };

    setItemsPerViewCount(calculateItemsPerView());

    const handleResize = () => {
      setItemsPerViewCount(calculateItemsPerView());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [itemsPerView]);

  const handleInfiniteScroll = useCallback(
    (newIndex: number) => {
      if (!infinite) return newIndex;

      setIsTransitioning(true);

      if (newIndex >= items.length + itemsPerViewCount) {
        setTimeout(() => {
          setIsTransitioning(false);
          setCurrentIndex(itemsPerViewCount);
        }, 300);
        return items.length + itemsPerViewCount - 1;
      }

      if (newIndex < itemsPerViewCount) {
        setTimeout(() => {
          setIsTransitioning(false);
          setCurrentIndex(items.length);
        }, 300);
        return 0;
      }

      setIsTransitioning(false);
      return newIndex;
    },
    [infinite, items.length, itemsPerViewCount]
  );

  const paginate = (newDirection: number) => {
    if (isTransitioning) return;

    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + newDirection;
      return handleInfiniteScroll(newIndex);
    });
  };

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

  const getVisibleItems = () => {
    const startIndex = currentIndex;
    return extendedItems.slice(startIndex, startIndex + itemsPerViewCount);
  };

  useEffect(() => {
    if (!autoPlay || isTransitioning) return;

    const interval = setInterval(() => {
      paginate(1);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [currentIndex, autoPlay, autoPlayInterval, isTransitioning]);

  if (!mounted) return null;

  return (
    <div className="relative w-full max-w-6xl mx-auto px-4">
      <div
        className={`relative h-96 ${
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
            className="absolute w-full h-full flex"
            style={{ gap: `${gap}px` }}
          >
            {getVisibleItems().map((image) => (
              <div
                key={image.id}
                className="relative flex-shrink-0 text-center"
                style={{
                  width: `calc((100% - ${
                    gap * (itemsPerViewCount - 1)
                  }px) / ${itemsPerViewCount})`,
                }}
              >
                <img
                  src={image.src}
                  alt={image.name}
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="image-name inline-block bg-brown text-white py-1 px-2 rounded-full mt-4">
                  <p>{image.name}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-center gap-4 mt-16">
        <button
          onClick={() => paginate(-1)}
          className="p-2 aspect-square g-transparent border border-gray-800 rounded-full"
          disabled={isTransitioning}
        >
          <ArrowLeft />
        </button>
        <button
          onClick={() => paginate(1)}
          className="p-2 aspect-square bg-transparent border border-gray-800 rounded-full"
          disabled={isTransitioning}
        >
          <ArrowRight />
        </button>
      </div>

      {showDots && (
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: items.length }).map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (isTransitioning) return;
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index + itemsPerViewCount);
              }}
              className={`w-2 h-2 rounded-full transition-colors ${
                index + itemsPerViewCount === currentIndex
                  ? "bg-blue-500"
                  : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;
