import Login from "@/app/components/ui/login"
import Link from "next/link";

export default function LoginPage() {
    return (
  
  <div> 
         <Link href="/register"> <div className="w-64 p-1.5 border rounded block mx-auto">  <Login/> </div></Link> 
      <div className="p-4 text-center">
        
     <h1 className="text-2xl font-bold">Login</h1>
    <form className="mt-1 space-y-4">
    <input type="email" placeholder="Email" className="w-64 p-1.5 border rounded block mx-auto" />
    <input type="password" placeholder="Password" className="w-64 p-1.5 border rounded block mx-auto" />
    <button className="px-5 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 block mx-auto">Login</button>
   </form>
</div>
</div>
    );
  }