"use client";
import React, { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";
import { z } from "zod";

// ✅ Validation schema
const categorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
});

const AddParentCategory = () => {
  const { getToken } = useAppContext();
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = categorySchema.safeParse({ name });
    if (!validation.success) {
      toast.error(validation.error.errors[0].message);
      return;
    }

    if (isLoading) return;
    setIsLoading(true);

    try {
      const token = await getToken();
      const { data } = await axios.post(
        "/api/category/add/parent",
        { name },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success(data.message);
        setName("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 min-h-screen flex flex-col justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="md:p-10 p-4 space-y-5 max-w-md w-full bg-white shadow rounded"
      >
        <h2 className="text-xl font-semibold text-center">Add Parent Category</h2>

        {/* Category Name */}
        <div className="flex flex-col gap-1">
          <label className="text-base font-medium" htmlFor="parent-category-name">
            Category Name
          </label>
          <input
            id="parent-category-name"
            type="text"
            placeholder="e.g. Electronics"
            className="outline-none py-2 px-3 rounded border border-gray-500/40"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2.5 font-medium rounded text-white ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-orange-600 hover:bg-orange-700"
          }`}
        >
          {isLoading ? "Adding..." : "ADD"}
        </button>
      </form>
    </div>
  );
};

export default AddParentCategory;
