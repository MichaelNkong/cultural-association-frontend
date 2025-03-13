import Link from "next/link";
import Users from  "@/app/lib/api/Users";
import Header from "@/app/components/ui/header"
import Section from "@/app/components/ui/section"
import ImageSlider from "@/app/Images/imagesslider"
import Image from "next/image";
import pic from '../public/photo.jpg'
export default async function Home() {
  const images = [

    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop",
    "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=800&h=400&fit=crop",
  ];
  return (
  

     <div >
     <Header/>
     <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Image
        src={}
        alt="Nature Image"
        width={800}
        height={400}
        className="rounded-lg"
      />
    </div>
    </div>

  );
}