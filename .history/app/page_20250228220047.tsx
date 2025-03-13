import Link from "next/link";
import Users from  "@/app/lib/api/Users";
import Header from "@/app/components/ui/header"
import Section from "@/app/components/ui/section"

export default async function Home() {
  const users= await Users.getUsers(); // Fetch users
  return (
  

     <div>
     <Header/>
     <diV></diV>
     
      <h2 className="text-3xl font-bold mt-8 ">Users</h2>
      <ul className="mt-4 list-disc list-inside text-center">
        {users.length > 0 ? (
          users.map((user: { id: number; username: string }, index: number) => (
            <li key={index}>
              <p className="text-blue-500">{user.username}</p>
            </li>
          ))
        ) : (
          <p>No users available</p>
        )}
      </ul>
      </div>

  );
}