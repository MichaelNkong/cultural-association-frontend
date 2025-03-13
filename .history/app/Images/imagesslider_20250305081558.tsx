"use client"; // For Next.js users

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import Image from 'next/image'
import "swiper/css/navigation";


const images = [
    '/photo.jpg',
    '/image.png',
  ];
  
  export default function ImageSlider() {
    const settings = { dots: true, infinite: true, speed: 500, slidesToShow: 1, slidesToScroll: 1 };
  
    return (
      <Swiper
            modules={[Navigation, Autoplay}
            navigation
            autoplay={{ delay: 3000 }}
            loop
        >
          {images.map((src, index) => (
            <SwiperSlide key={index}>
              <div className="flex justify-center">
                <Image src={src} alt={`Slide ${index + 1}`} width={1600} height={400} />
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    );
  }