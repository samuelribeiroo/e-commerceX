"use client";

import { useEffect, useState } from "react";

enum TIME {
  FIVE_MILLISECONDS = 5000,
  TEN_MILLISECONDS = 10000,
}

export function useManipulateCarousel() {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [touchStart, setTouchStart] = useState<number>(0);
  const [touchEnd, setTouchEnd] = useState<number>(0);

  const slides = [
    {
      id: 1,
      title: "",
      description: "",
      image:
        "https://pisces.bbystatic.com/image2/BestBuy_US/dam/2345255-ghp-mappls-5d0b93f4-2557-4395-955f-5783a455db74.jpg;maxHeight=960;maxWidth=960?format=webp",
    },
    {
      id: 2,
      title: "",
      description: "",
      image:
        "https://landing.terabyteshop.com.br/asus-conquiste-a-vitoria/images/conquite-a-vitoria.jpg",
    },
    {
      id: 3,
      href: 'categories/bbdbd3a2-ec07-44e6-bae0-9c21a36040f4',
      title: "aaaaaaaaaaaaaaaaa",
      description: "",
      image:
        "https://target.scene7.com/is/image/Target/GUEST_23e92c07-f426-4239-bc8f-1531803148e1?wid=668&qlt=80&fmt=webp",
    },
    {
      id: 4,
      title: "",
      description: "",
      image:
        "https://landing.terabyteshop.com.br/bundles/assassins-creed-shadows-intel/capa.png",
    },
  ];

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
