import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { GlobalState } from "../../../GlobalState";
import Loading from "../utils/loading/Loading";
import { useHistory, useParams } from "react-router-dom";

const initialState = {
  product_id: "",
  title: "",
  price: 0,
  description:
    "BRL 458.20 in 12 interest-free installments or BRL 4,948.52 in cash",
  content:
    "When Apple revived the MacBook range last year, it did so in style. The first new model since 2011, the 12-inch MacBook was the thinnest, lightest Mac to date, and signified Apple’s intentions to keep building laptops alongside its growing army of iPads and iPhones....",
  category: "",
  _id: "",
};

function CreateProducts() {
  const state = useContext(GlobalState);
  const [product, setProduct] = useState(initialState);
  const [categories] = state.categoriesAPI.categories;
  const [images, setImages] = useState(false);
  const [loading, setLoading] = useState(false);

  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;

  const history = useHistory();
  const param = useParams();

  const [products] = state.productsAPI.products;
  const [onEdit, setOnEdit] = useState(false);
  const [callback, setCallback] = state.productsAPI.callback;

  useEffect(() => {
    if (param.id) {
      setOnEdit(true);
      products.forEach((product) => {
        if (product._id === param.id) {
          setProduct(product);
          setImages(product.images);
        }
      });
    } else {
      setOnEdit(false);
      setProduct(initialState);
      setImages(false);
    }
  }, [param.id, products]);

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      if (!isAdmin) return alert("You're not an admin");
      const file = e.target.files[0];

      if (!file) return alert("File not exist.");

      if (file.size > 1024 * 1024)
        // 1mb
        return alert("Size too large!");

      if (file.type !== "image/jpeg" && file.type !== "image/png")
        // 1mb
        return alert("File format is incorrect.");

      let formData = new FormData();
      formData.append("file", file);

      setLoading(true);
      const res = await axios.post("/api/upload", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });
      setLoading(false);
      setImages(res.data);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const handleDestroy = async () => {
    try {
      if (!isAdmin) return alert("You're not an admin");
      setLoading(true);
      await axios.post(
        "/api/destroy",
        { public_id: images.public_id },
        {
          headers: { Authorization: token },
        }
      );
      setLoading(false);
      setImages(false);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!isAdmin) return alert("You're not an admin");
      if (!images) return alert("No Image Upload");

      if (onEdit) {
        await axios.put(
          `/api/products/${product._id}`,
          { ...product, images },
          {
            headers: { Authorization: token },
          }
        );
      } else {
        await axios.post(
          "/api/products",
          { ...product, images },
          {
            headers: { Authorization: token },
          }
        );
      }
      setCallback(!callback);
      history.push("/");
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const styleUpload = {
    display: images ? "block" : "none",
  };
  return (
    <div class="md:grid md:grid-cols-3 mt-6">
      <div class="md:col-span-1">
        <div class="ml-6 sm:px-0">
          <h3 class="text-2xl font-medium leading-6 text-gray-900">Product</h3>
          <p class="mt-1 text-xl text-gray-600">
            This information will be displayed publicly to be view and shopping
          </p>
        </div>
      </div>
      <div class="mt-5 md:col-span-1 md:mt-0">
        <form onSubmit={handleSubmit}>
          <div class="shadow sm:overflow-hidden sm:rounded-md">
            <div class="space-y-6 bg-white px-4 py-5 sm:p-6">
              <div class="col-span-6 sm:col-span-6 lg:col-span-2">
                <label
                  for="product_id"
                  class="block text-xl font-medium text-gray-700"
                >
                  Product ID
                </label>
                <input
                  type="text"
                  name="product_id"
                  id="product_id"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm text-xl"
                  required
                  value={product.product_id}
                  onChange={handleChangeInput}
                  disabled={onEdit}
                />
              </div>

              <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                <label
                  for="title"
                  class="block text-xl font-medium text-gray-700"
                >
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  required
                  value={product.title}
                  onChange={handleChangeInput}
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm text-xl"
                />
              </div>

              <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                <label
                  for="price"
                  class="block text-xl font-medium text-gray-700"
                >
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  required
                  value={product.price}
                  onChange={handleChangeInput}
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm text-xl"
                />
              </div>
              <div>
                <label
                  for="description"
                  class="block text-xl font-medium text-gray-700"
                >
                  Description
                </label>
                <div class="mt-1">
                  <textarea
                    id="description"
                    name="description"
                    rows="5"
                    required
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm text-xl"
                    value={product.description}
                    onChange={handleChangeInput}
                  ></textarea>
                </div>
              </div>
              <div>
                <label
                  for="content"
                  class="block text-xl font-medium text-gray-700"
                >
                  Content
                </label>
                <div class="mt-1">
                  <textarea
                    id="content"
                    name="content"
                    rows="7"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm text-xl"
                    required
                    value={product.content}
                    onChange={handleChangeInput}
                  ></textarea>
                </div>
              </div>
              <div class="col-span-6 sm:col-span-3">
                <label
                  for="category"
                  class="block text-xl font-medium text-gray-700"
                >
                  Categories
                </label>
                <select
                  id="category"
                  name="category"
                  value={product.category}
                  onChange={handleChangeInput}
                  class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm text-xl"
                >
                  {categories.map((category) => (
                    <option value={category._id} key={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label class="block text-xl font-medium text-gray-700">
                  Product photo
                </label>
                <div class="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                  <div class="space-y-1 text-center">
                    <svg
                      class="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <div class="flex text-xl text-gray-600">
                      {images ? (
                        ""
                      ) : (
                        <label
                          for="file-upload"
                          class="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                        >
                          <span>Upload a file</span>
                          <input
                            id="file-upload"
                            name="file"
                            type="file"
                            class="sr-only"
                            onChange={handleUpload}
                          />
                        </label>
                      )}
                      {loading ? (
                        <div>...</div>
                      ) : (
                        <div id="file_img" style={styleUpload}>
                          <img src={images ? images.url : ""} alt="" />
                          <button
                            onClick={handleDestroy}
                            className="mt-3 border-spacing-2 text-base"
                          >
                            Cancle
                          </button>
                        </div>
                      )}
                      {images ? "" : <p class="pl-1">or drag and drop</p>}
                    </div>
                    {images ? (
                      ""
                    ) : (
                      <p class="text-xs text-gray-500">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
              <button
                type="submit"
                class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-xl font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                {onEdit ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateProducts;
