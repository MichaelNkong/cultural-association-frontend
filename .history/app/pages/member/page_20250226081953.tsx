'use client'

import LoginButton from "@/app/components/ui/login"
import Link from "next/link";
import Users from  "@/app/lib/api/Users";
import Section from "@/app/components/ui/section"
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import "@/app/Styles/table.css"
import { useState } from "react";

export default async function MemberPage() {
     const users= await Users.getUsers(); // Fetch users
        return (
            <div>
                    <Section />
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
						<table className="table">
						  <thead className="thead-primary">
						    <tr>
						      <th>#</th>
						      <th>First Name</th>
						      <th>Last Name</th>
						      <th>Email Address</th>
						    </tr>
						  </thead>
						  <tbody>
					
                    
        {users.length > 0 ? (
          users.map((user: { id: number; username: string }, index: number) => (
            <tr>
            <th  key={index} scope="row">{index}
            
            <td>{user.username}</td>
            <td>user.em{}</td>
            </th>
            <li key={index}>
              <p className="text-blue-500">{user.username}</p>
            </li>
          ))
        ) : (
          <p>No users available</p>
        )}

						
						  
						      <td>markotto@email.com</td>
						    </tr>
						 
						 
						  
						  
						  </tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</section>
    </div>
          );
}