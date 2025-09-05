"use client";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-orange-600 text-white text-center px-6">
      <h1 className="text-5xl font-bold mb-4">You may be lost</h1>
      <p className="text-lg mb-10">
        The page you are looking for doesn’t exist or has been moved.
      </p>
      <Link
        href="/"
        className="bg-white text-orange-500 px-6 py-3 rounded-xl font-semibold hover:bg-orange-100 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
}
