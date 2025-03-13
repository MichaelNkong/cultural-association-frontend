

'use client'

import { useRouter } from "next/navigation"; // Import useRouter for navigation
import Link from "next/link";
import Header from "@/app/components/ui/header"
import { useState } from "react";
import Register from "@/app/lib/api/register"
export default function RegisterUser() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const router = useRouter(); // Initialize router
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    try {


      const response = await Register.registerUser(username, email, password);;
      if (response.status = 200) {
        const data = await response.data;
        router.push("/pages/login"); // Navigate to dashboard
      } else {
        setMessage("Invalid credentials, please try again.");
      }
    } catch (err) {
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className=" margin-top:">
      <Header />

      <div className="h-screen w-screen bg-gray-100 pt-10">
        <div className="max-w-xl mx-auto bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {message && <p className="mb-4 text-sm text-red-500">{message}</p>}
          <form onSubmit={handleSubmit} className="flex-col space-y-4">
            <div className="flex flex-col space-y-2">
              <input type="text" className="shadow-sm block w-full py-2 sm:text-sm rounded-md text-gray-800 disabled:bg-gray-200 sm:text-sm border-gray-300 focus:ring-primary-500 focus:border-primary-500 placeholder-gray-400 focus:outline-none" placeholder="username"  value={username}  name="username" onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="flex flex-col space-y-2">
              <input type="email" className="shadow-sm block w-full py-2 sm:text-sm rounded-md text-gray-800 disabled:bg-gray-200 sm:text-sm border-gray-300 focus:ring-primary-500 focus:border-primary-500 placeholder-gray-400 focus:outline-none" placeholder="email"  value={email}  name="email" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="flex flex-col space-y-2">
              <input type="password" className="shadow-sm block w-full py-2 sm:text-sm rounded-md text-gray-800 disabled:bg-gray-200 sm:text-sm border-gray-300 focus:ring-primary-500 focus:border-primary-500 placeholder-gray-400 focus:outline-none" placeholder="password"  value={password}  name="password" onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="block font-medium text-gray-600 font-normal flex items-start space-x-2"><div><input type="checkbox" className="h-4 w-4 rounded border-gray-300 focus:ring-indigo-500 text-indigo-600" /></div><div>I have read and agree to the <Link href="/legal/privacy" target="_blank" className="text-primary-600 hover:text-primary-700">Privacy Policy</Link> and <Link href="/legal/terms" target="_blank" className="text-primary-600 hover:text-primary-700">Terms and Conditions</Link>.</div></label>
            </div>
            <div className="flex justify-end">
              <button className="inline-flex items-center justify-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-md shadow-sm focus:outline-none ring-2 ring-offset-2 ring-transparent ring-offset-transparent disabled:bg-gray-400 appearance-none text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-white w-full" type="submit" name="submit" value="create"><div className="relative"><div className="">Sign up</div><div className="hidden absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"><svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg></div></div></button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}