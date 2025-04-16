"use client";

import Image from "next/image";

const HeroBanner = () => {
  return (
    <section className="bg-[#F5F5F5] w-full py-10 px-4 rounded-lg shadow-md mb-10">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left space-y-4">
          <h1 className="text-4xl font-bold text-gray-800">
            Headphones sem fio
          </h1>
          <p className="text-lg text-gray-600 max-w-md">
            Aproveite o melhor da tecnologia com conforto e qualidade de som
            impecável.
          </p>
        </div>

        <div className="relative w-full max-w-[360px] h-[240px]">
          <Image
            src="/headphones.webp"
            alt="Headphones"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
