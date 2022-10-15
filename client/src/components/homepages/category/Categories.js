import React, { useState, useContext } from "react";
import { GlobalState } from "../../../GlobalState";
import axios from "axios";
import {
  CheckBadgeIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";

function Categories() {
  const state = useContext(GlobalState);
  const [categories] = state.categoriesAPI.categories;
  const [category, setCategory] = useState("");
  const [token] = state.token;
  const [callback, setCallback] = state.categoriesAPI.callback;
  const [onEdit, setOnEdit] = useState(false);
  const [id, setID] = useState("");

  const createCategory = async (e) => {
    e.preventDefault();
    try {
      if (onEdit) {
        const res = await axios.put(
          `/api/category/${id}`,
          { name: category },
          {
            headers: { Authorization: token },
          }
        );
        alert(res.data.msg);
      } else {
        const res = await axios.post(
          "/api/category",
          { name: category },
          {
            headers: { Authorization: token },
          }
        );
        alert(res.data.msg);
      }
      setOnEdit(false);
      setCategory("");
      setCallback(!callback);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const editCategory = async (id, name) => {
    setID(id);
    setCategory(name);
    setOnEdit(true);
  };

  const deleteCategory = async (id) => {
    try {
      const res = await axios.delete(`/api/category/${id}`, {
        headers: { Authorization: token },
      });
      alert(res.data.msg);
      setCallback(!callback);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <div className="categories">
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Categories
          </h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          {/* Replace with your content */}
          <div className="px-4 py-6 sm:px-0">
            <div className="overflow-hidden shadow sm:rounded-lg">
              <form onSubmit={createCategory}>
                <label
                  htmlFor="category"
                  className="text-xl font-medium text-black"
                >
                  Category:{" "}
                </label>
                <input
                  type="text"
                  name="category"
                  value={category}
                  required
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-56 rounded-md border-gray-700 pl-7 pr-12 mr-3 focus:border-indigo-500 focus:ring-indigo-500 base:text-base"
                />

                <button
                  type="submit"
                  className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-1 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <CheckBadgeIcon
                    className="-ml-1 mr-2 h-5 w-5 text-gray-500"
                    aria-hidden="true"
                  />
                  {onEdit ? "Update" : "Create"}
                </button>
              </form>

              <div className="border-t border-gray-200">
                <dl>
                  {categories.map((category) => (
                    <div
                      className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                      key={category._id}
                    >
                      <dt className="text-xl font-medium text-gray-500">
                        <p>{category.name}</p>
                      </dt>
                      <dd className="mt-1 text-lg text-gray-900 sm:col-span-2 sm:mt-0">
                        <button
                          onClick={() =>
                            editCategory(category._id, category.name)
                          }
                          className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          <PencilIcon
                            className="-ml-1 mr-2 h-5 w-5 text-gray-500"
                            aria-hidden="true"
                          />
                          Edit
                        </button>

                        <button
                          onClick={() => deleteCategory(category._id)}
                          className="ml-3 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          <TrashIcon
                            className="-ml-1 mr-2 h-5 w-5"
                            aria-hidden="true"
                          />
                          Delete
                        </button>
                      </dd>
                      <div className="border-t border-gray-200"></div>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
          {/* /End replace */}
        </div>
      </main>
    </div>
  );
}

export default Categories;
