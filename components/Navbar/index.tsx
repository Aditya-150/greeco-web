"use client";
import Link from "next/link";
import { MenuIcon, XIcon } from "lucide-react";
import { useState } from "react";

/* eslint-disable @next/next/no-img-element */
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed top-5 left-0 right-0 z-50">
      {/* Main Navbar */}
      <div className="sm:max-w-7xl max-w-sm rounded-full mx-auto px-4 sm:px-6 sm:py-6 py-4 bg-white w-full flex justify-between items-center shadow-lg">
        <div className="z-50">
          <img
            alt="logo"
            src="/Greecomart-logo.svg"
            className="w-40 hidden sm:block"
          />
          <img
            alt="hero image"
            src="/Logo_icon.svg"
            className="w-10 sm:hidden"
          />
        </div>

        {/* Desktop Links */}
        <div className="hidden sm:inline-flex gap-x-4 font-medium">
          <Link href="/#about">ABOUT</Link>
          <Link href="/#products">PRODUCTS</Link>
        </div>

        <button className="hidden sm:block rounded-full border border-black bg-transparent text-black py-2 px-4">
          Request a Quote
        </button>

        {/* Mobile Menu Toggle */}
        <button
          className="block sm:hidden rounded-full z-50"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <XIcon className="size-8" />
          ) : (
            <MenuIcon className="size-8" />
          )}
        </button>
      </div>

      {/* Mobile Menu (Dropdown) */}
      <div
        className={`flex max-w-sm mx-auto flex-col items-center absolute right-0 left-0 top-5 rounded-2xl gap-y-4 bg-white w-full py-8 px-4 transition-all duration-300 ease-in-out shadow-lg transform ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden sm:hidden`}
      >
        <Link href="/#about" onClick={() => setIsOpen(false)}>
          ABOUT
        </Link>
        <Link href="/#products" onClick={() => setIsOpen(false)}>
          PRODUCTS
        </Link>
        <button
          className="rounded-full border border-black bg-transparent text-black py-2 px-6 mt-4"
          onClick={() => setIsOpen(false)}
        >
          Request a Quote
        </button>
      </div>
    </div>
  );
}
