import React from 'react';
import Link from "next/link";
export default function Footer() {
    return (
        <div className="flex flex-col min-h-screen">
  {/* Main Content */}
  <main className="flex-grow">
    {/* Your page content here */}
  </main>

  {/* Sticky Footer */}
  <header className="sticky bottom-0 bg-gray-800 p-6 mt-auto">
    <nav>
      <div className="container mx-auto flex justify-between items-center ml-0">
      <div className="max-w-7xl mx-auto text-center">
          <p>&copy; 2023 Real Estate Company. All rights reserved.</p>
        </div>
      </div>
    </nav>
  </header>
</div>
    );
}
