import { Outfit } from "next/font/google";
import "./globals.css";
import { AppContextProvider } from "@/context/AppContext";
import { Toaster } from "react-hot-toast";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  ClerkProvider
} from '@clerk/nextjs'

const outfit = Outfit({ subsets: ['latin'], weight: ["300", "400", "500"] })

export const metadata = {
  title: "Shopify - GreatStack",
  description: "E-Commerce with Next.js ",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${outfit.className} antialiased text-gray-700`} >
          <Toaster />
          <AppContextProvider> 
            
            {/* //fast check with provider for auth, pleas check the Navbar.jsx file // */}
            <header className="flex justify-end items-center p-4 gap-4 h-12 bg-orange-600">
            {/* <SignedOut>   
              <SignInButton />
              <SignUpButton>
                <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn> 
            <UserButton />
            </SignedIn> */}
          </header> 
            {children}
          </AppContextProvider>
        </body>
      </html>
      </ClerkProvider>
  );
}
