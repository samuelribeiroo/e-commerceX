"use client";

import { useEffect, useState } from "react";
import { slides } from "../data";

enum TIME {
  FIVE_MILLISECONDS = 5000,
  TEN_MILLISECONDS = 10000,
}

export function useManipulateCarousel() {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [touchStart, setTouchStart] = useState<number>(0);
  const [touchEnd, setTouchEnd] = useState<number>(0);


  useEffect(() => {
    let interval: NodeJS.Timeout;

    const handleAutoSkipSlides = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, TIME.FIVE_MILLISECONDS);

    if (isAutoPlaying) interval = handleAutoSkipSlides;
    
    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const pauseAutoPlay = () => {
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), TIME.TEN_MILLISECONDS);
  };

  const nextSlide = () => {
    pauseAutoPlay();
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    pauseAutoPlay();
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToSlide = (index: number) => {
    pauseAutoPlay();
    setCurrentSlide(index);
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    setTouchStart(event.touches[0].clientX);
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    setTouchEnd(event.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      nextSlide();
    }

    if (touchStart - touchEnd < -50) {
      prevSlide();
    }
  };

  return {
    slides,
    currentSlide,
    handleTouchStart,
    handleTouchEnd,
    handleTouchMove,
    nextSlide,
    prevSlide,
    goToSlide,
  };
}
