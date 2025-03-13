



"use client"; // For Next.js users
var Kraken = require('kraken');
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import Image from 'next/image'
import "swiper/css/navigation";


var kraken = new Kraken({
    api_key: 'your_api_key',
    api_secret: 'your_api_secret'
});

  
  export default function ImageSlider() {
    const settings = { dots: true, infinite: true, speed: 500, slidesToShow: 1, slidesToScroll: 1 };
  
    return (
      <div>
        hello world

      </div>
    );
  }







