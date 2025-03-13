import Link from "next/link";
import Users from  "@/app/lib/api/Users";
import Hearder from "@/app/components/ui/header"
import Section from "@/app/components/ui/sectio"

export default async function Home() {
  const users= await Users.getUsers(); // Fetch users
  return (
  
    <div className= "p-8 text-center">
     <Header/>
     <div>
        <Section/>
      <h1 className="text-4xl font-bold">Welcome to Our Cultural Association</h1>
      <p className="mt-4 text-lg">Preserving culture and heritage for future generations.</p>

      <h2 className="text-3xl font-bold mt-8">Users</h2>
      <ul className="mt-4 list-disc list-inside">
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
    </div>
  );
}