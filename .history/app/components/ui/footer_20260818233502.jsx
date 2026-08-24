import React from 'react';
import Link from "next/link";
export default function Footer() {
    return (
        <footer className="site-footer">
            <p>Manyu Cultural Association</p>
            <span>Gathering memory, making a future.</span>
            <span>© {new Date().getFullYear()}</span>
        </footer>
    );
}
