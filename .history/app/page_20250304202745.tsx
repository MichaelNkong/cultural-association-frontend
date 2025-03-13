import Link from "next/link";
import Users from  "@/app/lib/api/Users";
import Header from "@/app/components/ui/header"
import Section from "@/app/components/ui/section"
import ImageSlider from "@/app/Images/imagesslider" 
import <footer></footer> from  "@/app/components/ui/footer"
export default async function Home() {
  
  return (
  

     <div >
     <Header/>
        <div className=" text-center mt-3 p-2">
       <h1 className="text-4xl font-bold">Welcome to Our Cultural Association</h1>
        <p className="mt-4 text-lg">Preserving culture and heritage for future generations.</p>

 
        <ImageSlider/>
      </div>

      </div>

  );
}