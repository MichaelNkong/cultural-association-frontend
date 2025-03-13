



"use client"; // For Next.js users
var Kraken = require('kraken');
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import Image from 'next/image'
import "swiper/css/navigation";
import Footer from "@/app/components/ui/footer"
import Header from "@/app/components/ui/header";
import { useState } from 'react';

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
  export default function ImageResizer() {
    const [url, setUrl] = useState("");

    
    kraken.url(params as KrakenParams, function(err: Error | null, data: KrakenResponse) {
        if (err) {
            console.log('Failed. Error message: %s', err);
        } else {
            console.log('Success. Optimized image URL: %s', setUrl(data.kraked_url));
        }
    });
  
    return (
       <div>
         <Header />
         <section className="ftco-section">
           <div className="container">
             <div className="row justify-content-center">
               <div className="col-md-6 text-center mb-5">
                 <h2 className="heading-section">Registered Members</h2>
               </div>
             </div>
             <div className="row">
               <div className="col-md-12">
                 <div className="table-wrap">
                
                       
                    
                       {url.length > 0 ? (
                      (
                           </tr>
                         ))
                       ) : (
                         <p>
                        No users found.
                         </p>
                       )}
              
                 </div>
               </div>
             </div>
           </div>
         </section>
         <Footer/>
       </div>
     );
   }








