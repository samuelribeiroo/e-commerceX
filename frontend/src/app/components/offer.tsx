import Link from "next/link";
import { images } from "../data";
import Image from "next/image";

export default function OfferComponent() {
  return (
    <section className="relative w-full mt-8">
      <div className="relative w-full rounded-md overflow-hidden">
        <Image
          src={images[0].src.toString()}
          alt={images[0].alt.toString()}
          width={1440}
          height={100}
          className="object-cover"
          priority
        />
        
      
        <div className="absolute inset-0 flex flex-col justify-center items-center p-4 text-center mr-[500px]">
          <div className="max-w-[90%] md:max-w-[80%]">
            <Link
              href="/"
              className="font-inter text-white text-base sm:text-lg md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-1 md:mb-2 hover:underline px-2 py-1 md:px-4 md:py-2"
            >
              Nintendo Switch
            </Link>
            <p className="hidden md:block text-white text-xs md:text-lg font-inter mt-1 md:mt-2 mx-auto max-w-[95%] md:max-w-[80%]">
              Nintendo Switch é console de videogame doméstico da Nintendo.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}