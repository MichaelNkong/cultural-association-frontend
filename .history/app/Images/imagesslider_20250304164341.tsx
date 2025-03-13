"use client"; // For Next.js users

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import Autoplay from "swiper";
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
            <img src={src} alt={`Slide ${index + 1}`} className="w-full rounded-lg" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}