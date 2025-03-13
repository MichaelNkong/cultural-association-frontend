"use client"; // For Next.js users

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import Image from 'next/image'
import "swiper/css/navigation";
import pic from '../public/photo.jpg'
import pic2 from '../public/image.png'

const images = [
    '/public/photo.jpg',
    '/public/image.png',
  ];
  
  export default function ImageSlider() {
    const settings = { dots: true, infinite: true, speed: 500, slidesToShow: 1, slidesToScroll: 1 };
  
    return (
      <Swiper
            modules={[Navigation, Autoplay]}
            navigation
            autoplay={{ delay: 3000 }}
            loop
        >
          {images.map((src, index) => (
            <SwiperSlide key={index}>
              <div className="flex justify-center">
                <Image src=/public/photo.jpg' alt={`Slide ${index + 1}`} width={500} height={300} />
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    );
  }