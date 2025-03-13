"use client"; // Only needed in Next.js App Router

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";

const images = [
  "https://source.unsplash.com/800x400/?nature",
  "https://source.unsplash.com/800x400/?city",
  "https://source.unsplash.com/800x400/?ocean",
];

export default function ImageSlider() {
  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        className="rounded-lg"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-64">
              <Image
                src={src}
                alt={`Slide ${index + 1}`}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}