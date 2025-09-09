import React from "react";
import ProductCard from "./ProductCard";
import { useAppContext } from "@/context/AppContext";
import { Shirt, Smartphone, Watch, Home, Utensils } from "lucide-react";

const HomeProducts = () => {

  const { products, router } = useAppContext()

   const categories = [
    { name: "Fashion", icon: <Shirt className="w-5 h-5" /> },
    { name: "Electronics", icon: <Smartphone className="w-5 h-5" /> },
    { name: "Watches", icon: <Watch className="w-5 h-5" /> },
    { name: "Home & Living", icon: <Home className="w-5 h-5" /> },
    { name: "Food & Drink", icon: <Utensils className="w-5 h-5" /> },
  ];


  return (
    <div className="flex flex-col items-center pt-14">

      <div className="w-full mb-10 ic">
        <p className="text-2xl font-medium mb-6">Shop by Category</p>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
          {categories.map((cat, index) => (
            <div
              key={index}
              onClick={() => router.push(`/category/${cat.name.toLowerCase()}`)}
              className="flex flex-col items-center justify-center p-4 border rounded-xl cursor-pointer hover:shadow-md hover:bg-slate-50 transition"
            >
              <div className="bg-gray-100 p-3 rounded-full mb-2">
                {cat.icon}
              </div>
              <p className="text-sm font-medium">{cat.name}</p>
            </div>
          ))}
        </div>
      </div>

      <p className="text-2xl font-medium text-left w-full">Popular products</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex-col items-center gap-6 mt-6 pb-14 w-full">
        {products.map((product, index) => <ProductCard key={index} product={product} />)}
      </div>
      <button onClick={() => { router.push('/all-products') }} className="px-12 py-2.5 border rounded text-gray-500/70 hover:bg-slate-50/90 transition">
        See more
      </button>
    </div>
  );
};

export default HomeProducts;
