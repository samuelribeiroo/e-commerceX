"use client";

import { PropsWithChildren } from "react";
import { CircleChevronRight, CircleChevronLeft } from "lucide-react";
import {
  CarouselContentProps,
  CarouselImageProps,
  ControlSlideProps,
} from "@/app/@types";
import { useManipulateCarousel } from "@/app/hooks/useManipulateCarousel";
import Link from "next/link";

export default function ProductsCarousel() {
  const {
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    slides,
    currentSlide,
    nextSlide,
    prevSlide,
    goToSlide,
  } = useManipulateCarousel();

  return (
    <>
      <Carousel>
        <CarouselContent
          start={handleTouchStart}
          move={handleTouchMove}
          end={handleTouchEnd}
        >
          {slides.map((slide, index) => (
            <CarouselImage
              key={slide.id}
              id={slide.id}
              index={index}
              slide={currentSlide}
              image={slide.image}
              title={slide.title}
            >
              <CarouselText
                title={slide.title}
                description={slide.description}
                href={String(slide.href)}
              />
            </CarouselImage>
          ))}

          <NavigationCarousel next={nextSlide} prev={prevSlide} />
        </CarouselContent>

        <NavigateCarouselDots>
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`size-2 rounded-full focus:outline-none transition-all duration-300 ${
                index === currentSlide ? "bg-white size-4" : "bg-white/50"
              }`}
              aria-label={`Ir para slide ${index + 1}`}
            />
          ))}
        </NavigateCarouselDots>
      </Carousel>
    </>
  );
}

function Carousel({ children }: PropsWithChildren) {
  return (
    <>
      <div className="relative w-full overflow-hidden rounded-md text-white">
        {children}
      </div>
    </>
  );
}

function CarouselImage({
  id,
  index,
  image,
  slide,
  title,
  children,
}: CarouselImageProps) {
  return (
    <>
      <div
        key={id}
        className={`absolute top-0 left-0 size-full transition-opacity duration-500 ease-in-out ${
          index === slide ? "opacity-100 z-10" : "opacity-0 z-0"
        }`}
      >
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="size-full object-fill"
        />

        {children}
      </div>
    </>
  );
}

function NavigationCarousel({ next, prev }: ControlSlideProps) {
  return (
    <>
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 rounded-full p-2 focus:outline-none"
        aria-label="Slide anterior"
      >
        <CircleChevronLeft />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 rounded-full p-2 focus:outline-none"
        aria-label="Próximo slide"
      >
        <CircleChevronRight />
      </button>
    </>
  );
}

function CarouselText(props: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <>
      <span className="absolute bottom-16 left-0 w-full px-8 md:px-16 z-20">
        <Link href={props.href}>
          <h2 className="text-2xl md:text-3xl font-bold mb-2">{props.title}</h2>
        </Link>
        <p className="text-sm md:text-base opacity-80">{props.description}</p>
      </span>
    </>
  );
}

function CarouselContent({ start, end, move, children }: CarouselContentProps) {
  return (
    <>
      <div
        className="relative h-[500px] md:h-[600px] w-full"
        onTouchStart={start}
        onTouchMove={move}
        onTouchEnd={end}
      >
        {children}
      </div>
    </>
  );
}

function NavigateCarouselDots({ children }: PropsWithChildren) {
  return (
    <>
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-20">
        {children}
      </div>
    </>
  );
}
