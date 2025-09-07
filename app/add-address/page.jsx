"use client";
import { assets } from "@/assets/assets";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { NextResponse } from "next/server";
import toast from "react-hot-toast";
import { z } from "zod";
import axios from "axios";

// ✅ Validation schema
const addressSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^\d+$/, "Phone number must contain only numbers"),
  pincode: z
    .string()
    .min(5, "Pin code must be at least 5 digits")
    .regex(/^\d+$/, "Pin code must contain only numbers"),
  area: z.string().min(1, "Address (area/street) is required"),
  city: z.string().min(1, "City/District/Town is required"),
  state: z.string().min(1, "State is required"),
});

const AddAddress = () => {
  const { getToken, router } = useAppContext();

  const [address, setAddress] = useState({
    fullName: "",
    phoneNumber: "",
    pincode: "",
    area: "",
    city: "",
    state: "",
  });

  const [loading, setLoading] = useState(false); // ✅ prevent multiple clicks

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (loading) return; // ✅ stop if already in progress

    try {
      addressSchema.parse(address); // ✅ validation
      setLoading(true); // start loading

      const token = await getToken();
      const { data } = await axios.post(
        "/api/user/add-address",
        { address },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success(data.message);
        router.push("/cart");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      if (error.errors) {
        toast.error(error.errors[0].message);
      } else {
        toast.error(error.message || "Something went wrong");
      }
      return NextResponse.json({ success: false, message: error.message });
    } finally {
      setLoading(false); // ✅ always reset loading
    }
  };

  return (
    <>
      <Navbar />
      <div className="px-6 md:px-16 lg:px-32 py-16 flex flex-col md:flex-row justify-between">
        <form onSubmit={onSubmitHandler} className="w-full">
          <p className="text-2xl md:text-3xl text-gray-500">
            Add Shipping{" "}
            <span className="font-semibold text-orange-600">Address</span>
          </p>
          <div className="space-y-3 max-w-sm mt-10">
            <input
              className="px-2 py-2.5 border border-gray-500/30 rounded outline-none w-full text-gray-500"
              type="text"
              placeholder="Full name"
              onChange={(e) =>
                setAddress({ ...address, fullName: e.target.value })
              }
              value={address.fullName}
            />
            <input
              className="px-2 py-2.5 border border-gray-500/30 rounded outline-none w-full text-gray-500"
              type="text"
              placeholder="Phone number"
              onChange={(e) =>
                setAddress({ ...address, phoneNumber: e.target.value })
              }
              value={address.phoneNumber}
            />
            <input
              className="px-2 py-2.5 border border-gray-500/30 rounded outline-none w-full text-gray-500"
              type="text"
              placeholder="Pin code"
              onChange={(e) =>
                setAddress({ ...address, pincode: e.target.value })
              }
              value={address.pincode}
            />
            <textarea
              className="px-2 py-2.5 border border-gray-500/30 rounded outline-none w-full text-gray-500 resize-none"
              rows={4}
              placeholder="Address (Area and Street)"
              onChange={(e) => setAddress({ ...address, area: e.target.value })}
              value={address.area}
            ></textarea>
            <div className="flex space-x-3">
              <input
                className="px-2 py-2.5 border border-gray-500/30 rounded outline-none w-full text-gray-500"
                type="text"
                placeholder="City/District/Town"
                onChange={(e) =>
                  setAddress({ ...address, city: e.target.value })
                }
                value={address.city}
              />
              <input
                className="px-2 py-2.5 border border-gray-500/30 rounded outline-none w-full text-gray-500"
                type="text"
                placeholder="State"
                onChange={(e) =>
                  setAddress({ ...address, state: e.target.value })
                }
                value={address.state}
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading} // ✅ disable button while loading
            className={`max-w-sm w-full mt-6 py-3 uppercase text-white ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-orange-600 hover:bg-orange-700"
            }`}
          >
            {loading ? "Saving..." : "Save address"}
          </button>
        </form>
        <Image
          className="md:mr-16 mt-16 md:mt-0"
          src={assets.my_location_image}
          alt="my_location_image"
        />
      </div>
      <Footer />
    </>
  );
};

export default AddAddress;
