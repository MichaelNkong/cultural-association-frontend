import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {/* Navbar */}
      <nav className="p-4 bg-gray-800 text-white flex justify-around">
        <Link href="/" className="hover:underline">Home</Link>
        <Link href="/membership" className="hover:underline">Membership</Link>
        <Link href="/events" className="hover:underline">Events</Link>
        <Link href="/news" className="hover:underline">News</Link>
        <Link href="/contact" className="hover:underline">Contact</Link>
      </nav>

      {/* Page Content */}
      <main>{children}</main>
    </div>
  );
}