



"use client"; // For Next.js users
var Kraken = require('kraken');
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import Image from 'next/image'
import "swiper/css/navigation";



  
  export default function ImageSlider() {
    const settings = { dots: true, infinite: true, speed: 500, slidesToShow: 1, slidesToScroll: 1 };
  
    return (
      <div>
        hello world

      </div>
    );
  }






var kraken = new Kraken({
    api_key: 'your_api_key',
    api_secret: 'your_api_secret'
});

var params = {
    url: 'https://awesome-website.com/images/header.jpg',
    wait: true
};

interface KrakenParams {
    url: string;
    wait: boolean;
}

interface KrakenResponse {
    kraked_url: string;
}

kraken.url(params as KrakenParams, function(err: Error | null, data: KrakenResponse) {
    if (err) {
        console.log('Failed. Error message: %s', err);
    } else {
        console.log('Success. Optimized image URL: %s', data.kraked_url);
    }
});