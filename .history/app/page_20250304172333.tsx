import Link from "next/link";
import Users from  "@/app/lib/api/Users";
import Header from "@/app/components/ui/header"
import Section from "@/app/components/ui/section"
import ImageSlider from "@/app/Images/imagesslider"
import Image from "next/image";
export default async function Home() {
  
  return (
  

     <div >
     <Header/>
     <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Image
        src="https://source.unsplash.com/800x400/?nature"
        alt="Nature Image"
        width={800}
        height={400}
        className="rounded-lg"
      />
    </div>

  );
}