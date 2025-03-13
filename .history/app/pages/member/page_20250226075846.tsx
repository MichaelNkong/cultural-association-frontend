'use client'

import LoginButton from "@/app/components/ui/login"
import Link from "next/link";
import Section from "@/app/components/ui/section"
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import table from "@/app/Styles/table"
import { useState } from "react";

export default function MemberPage() {
   
        return (
            <div>
                    <Section />
            <section className="ftco-section">
		<div className="container">
			<div className="row justify-content-center">
				<div className="col-md-6 text-center mb-5">
					<h2 className="heading-section">Table #01</h2>
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
						    <tr>
						      <th scope="row">1</th>
						      <td>Mark</td>
						      <td>Otto</td>
						      <td>markotto@email.com</td>
						    </tr>
						    <tr>
						      <th scope="row">2</th>
						      <td>Jacob</td>
						      <td>Thornton</td>
						      <td>jacobthornton@email.com</td>
						    </tr>
						    <tr>
						      <th scope="row">3</th>
						      <td>Larry</td>
						      <td>the Bird</td>
						      <td>larrybird@email.com</td>
						    </tr>
						    <tr>
						      <th scope="row">4</th>
						      <td>John</td>
						      <td>Doe</td>
						      <td>johndoe@email.com</td>
						    </tr>
						    <tr>
						      <th scope="row">5</th>
						      <td>Gary</td>
						      <td>Bird</td>
						      <td>garybird@email.com</td>
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