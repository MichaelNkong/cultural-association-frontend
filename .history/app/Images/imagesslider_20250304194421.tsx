"use client"; // For Next.js users

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import Image from 'next/image'
import "swiper/css/navigation";
import pic from '../public/photo.jpg'
import pic2 from '../public/image.png'

const images : string[]  = [
'/public/photo.jpg',
'/public/image.png'
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
            <Image src={src} alt={`Slide ${index + 1}`} width={700}   height={300}/>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}