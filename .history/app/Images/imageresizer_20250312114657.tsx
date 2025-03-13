



"use client"; // For Next.js users
var Kraken = require('kraken');
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import Image from 'next/image'
import "swiper/css/navigation";


var kraken = new Kraken({
    api_key: 'bfbdc7bd7883f3fa69bfa20802c5dee6',
    api_secret: '94ece621f4605bf900256894d5118652cdd188c4'
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
  
  export default function ImageResizer() {
    const settings = { dots: true, infinite: true, speed: 500, slidesToShow: 1, slidesToScroll: 1 };
  
    return (
      <div>
        hello world

      </div>
    );
  }







