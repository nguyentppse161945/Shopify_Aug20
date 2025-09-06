"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const [count, setCount] = useState(9);
  const router = useRouter();

  useEffect(() => {
    if (count === 0) {
      router.push("/");
      return;
    }
    const timer = setTimeout(() => setCount((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [count, router]);

  return (
    <div className="relative flex flex-col items-center justify-center h-screen overflow-hidden bg-gradient-to-b from-orange-50 via-white to-orange-100 text-orange-600 text-center px-6">
      
      {/* Floating shiny balloons */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-bounce-slow shadow-lg"
          style={{
            width: `${10 + Math.random() * 20}px`,
            height: `${14 + Math.random() * 25}px`,
            background: `radial-gradient(circle at 30% 30%, white, ${
              ["#f87171", "#60a5fa", "#34d399", "#fbbf24", "#a78bfa", "#fb7185"][
                Math.floor(Math.random() * 6)
              ]
            })`,
            top: `${Math.random() * 80}%`,
            left: `${Math.random() * 90}%`,
            animationDuration: `${3 + Math.random() * 3}s`,
          }}
        />
      ))}

      {/* Content */}
      <h1 className="text-6xl font-extrabold mb-4 drop-shadow-lg">🎈 You may be lost 🎉</h1>
      <p className="text-lg mb-6 text-gray-600 max-w-md">
        The page you are looking for doesn’t exist or has been moved.  
        Don’t worry, we’ll bring you back to shopping fun!
      </p>

      {/* Countdown */}
      <p className="text-xl font-semibold text-orange-300 mb-6">
        Redirecting in <span className="text-2xl font-bold">{count}</span>...
      </p>

      <Link
        href="/"
        className="bg-orange-600 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-orange-700 transition shadow-md hover:shadow-lg"
      >
        Go Back Home Now
      </Link>

      {/* Confetti effect */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <span
            key={i}
            className="absolute w-2 h-2 bg-orange-400 rounded-full animate-fall"
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${2 + Math.random() * 3}s`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Extra Tailwind animations */}
      <style jsx>{`
        .animate-bounce-slow {
          animation: bounce 4s infinite alternate;
        }
        .animate-fall {
          animation: fall linear infinite;
        }
        @keyframes fall {
          0% {
            transform: translateY(-10%);
            opacity: 1;
          }
          100% {
            transform: translateY(110vh);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
