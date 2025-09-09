"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAppContext } from "@/context/AppContext";
import Footer from "@/components/seller/Footer";
import Loading from "@/components/Loading";
import { z } from "zod";

const categorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
});

const CategoryList = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { router, getToken, user } = useAppContext();
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [name, setName] = useState("");

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get("/api/category/list/sub", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setCategories(data.categories);
        setLoading(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchCategories();
    }
  }, [user]);

  const handleUpdateClick = (cat) => {
    setSelectedCategory(cat);
    setName(cat.name);
    setShowModal(true);
  };

  const handleDeleteClick = (cat) => {
    setSelectedCategory(cat);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      setIsDeleting(true);
      await axios.delete(`/api/category/delete/sub/${selectedCategory._id}`);
      toast.success("Category deleted");
      setShowDeleteModal(false);
      fetchCategories();
    } catch (err) {
      toast.error("Failed to delete");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleUpdateSubmit = async () => {
    const parsed = categorySchema.safeParse({ name });
    if (!parsed.success) {
      toast.error(parsed.error.errors[0].message);
      return;
    }

    try {
      setIsSaving(true);
      await axios.put(`/api/category/update/sub/${selectedCategory._id}`, {
        name,
      });
      toast.success("Category updated");
      setShowModal(false);
      fetchCategories();
    } catch (error) {
      console.error(error);
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      toast.error(message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex-1 min-h-screen flex flex-col justify-between">
      {loading ? (
        <Loading />
      ) : (
        <div className="w-full md:p-10 p-4">
          <h2 className="pb-4 text-lg font-medium">All Categories</h2>
          <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
            <table className="table-fixed w-full overflow-hidden">
              <thead className="text-gray-900 text-sm text-left">
                <tr>
                  <th className="px-4 py-3 font-medium truncate">Category</th>
                  <th className="px-4 py-3 font-medium truncate">Created At</th>
                  <th className="px-4 py-3 font-medium truncate">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-500">
                {categories.map((cat, index) => (
                  <tr key={index} className="border-t border-gray-500/20">
                    <td className="px-4 py-3">{cat.name}</td>
                    <td className="px-4 py-3">
                      {new Date(cat.createdAt).toLocaleDateString()}
                    </td>
                    <td className=" p-2">
                      <button
                        onClick={() => handleUpdateClick(cat)}
                        className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDeleteClick(cat)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Update Modal */}
            {showModal && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
                <div className="bg-white p-6 rounded shadow-md">
                  <h2 className="text-lg font-bold mb-4">Update Category</h2>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border p-2 w-full mb-4"
                  />
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => setShowModal(false)}
                      className="bg-gray-300 px-4 py-2 rounded"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleUpdateSubmit}
                      disabled={isSaving}
                      className={`px-4 py-2 rounded text-white ${
                        isSaving
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-orange-600 hover:bg-orange-700"
                      }`}
                    >
                      {isSaving ? "Saving..." : "Save"}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
                <div className="bg-white p-6 rounded shadow-md max-w-sm w-full">
                  <h2 className="text-lg font-bold mb-4 text-red-600">
                    Confirm Delete
                  </h2>
                  <p className="mb-4">
                    Are you sure you want to delete{" "}
                    <span className="font-semibold">
                      {selectedCategory?.name}
                    </span>
                    ? <br />
                    This action cannot be undone.
                  </p>
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => setShowDeleteModal(false)}
                      className="bg-gray-300 px-4 py-2 rounded"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={confirmDelete}
                      disabled={isDeleting}
                      className={`px-4 py-2 rounded text-white ${
                        isDeleting
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-red-500 hover:bg-red-600"
                      }`}
                    >
                      {isDeleting ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default CategoryList;
