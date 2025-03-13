



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



  
  export default function ImageResizer() {
    const [message, setUrl] = useState("");
  
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
                
                       
                    
                       {users.length > 0 ? (
                         users.map((user) => (
                           <tr key={user.id}>
                             <th scope="row">{user.id}</th>
                             <td>{user.username}</td>
                             <td>{user.email}</td>
                             <td>
                               <input type="checkbox" name="selectRow" />
                             </td>
                           </tr>
                         ))
                       ) : (
                         <tr>
                           <td colSpan={4}>No users found.</td>
                         </tr>
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







function useState(arg0: string): [any, any] {
    throw new Error("Function not implemented.");
}

