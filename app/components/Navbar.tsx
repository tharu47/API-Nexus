"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react"; // Icons for mobile menu

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        
        <Link href="/" className="text-xl font-bold">API Nexus</Link>

        {/* Desktop Navigation (Aligned Right) */}
        <div className="hidden md:flex space-x-6 ml-auto">
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/movie" className="hover:underline">Movies Search</Link>
          <Link href="/translator" className="hover:underline">Languages Translator</Link>
          <Link href="/weather" className="hover:underline">Weather App</Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden block focus:outline-none" 
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-blue-600 p-4 transition-all duration-300">
          <Link href="/" className="block py-2 hover:underline" onClick={closeMenu}>Home</Link>
          <Link href="/movie" className="block py-2 hover:underline" onClick={closeMenu}>Movies Search</Link>
          <Link href="/translator" className="block py-2 hover:underline" onClick={closeMenu}>Languages Translator</Link>
          <Link href="/weather" className="block py-2 hover:underline" onClick={closeMenu}>Weather App</Link>
        </div>
      )}
    </nav>
  );
}
