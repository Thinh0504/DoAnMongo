import React, { useContext, useState } from "react";
import { GlobalState } from "../../../GlobalState";
import ProductItem from "../utils/productItem/ProductItem";
import Loading from "../utils/loading/Loading";
import axios from "axios";
import Filters from "./Filters";
import Load from "./Load";

function Products() {
  const state = useContext(GlobalState);
  const [products, setProducts] = state.productsAPI.products;
  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;
  const [callback, setCallback] = state.productsAPI.callback;
  const [loading, setLoading] = useState(false);
  const [isCheck, setIsCheck] = useState(false);

  const handleCheck = (id) => {
    products.forEach((product) => {
      if (product._id === id) product.checked = !product.checked;
    });
    setProducts([...products]);
  };

  const deleteProduct = async (id, public_id) => {
    try {
      setLoading(true);
      const destroyImg = axios.post(
        "/api/destroy",
        { public_id },
        {
          headers: { Authorization: token },
        }
      );
      const deleteProduct = axios.delete(`/api/products/${id}`, {
        headers: { Authorization: token },
      });

      await destroyImg;
      await deleteProduct;
      setCallback(!callback);
      setLoading(false);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const checkAll = () => {
    products.forEach((product) => {
      product.checked = !isCheck;
    });
    setProducts([...products]);
    setIsCheck(!isCheck);
  };

  const deleteAll = () => {
    products.forEach((product) => {
      if (product.checked) {
        // eslint-disable-next-line no-restricted-globals
        confirm("Delete all checked products?")
          ? deleteProduct(product._id, product.images.public_id)
          : alert("Cancle delete");
      }
    });
  };

  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );
  return (
    <>
      <div className="bg-slate-500">
        <div className="mx-auto max-w-2xl py-5 px-4 sm:py-5 sm:px-6 lg:max-w-7xl lg:px-8">
          {isAdmin && (
            <>
              <div className="col-span-3 inline-flex sm:col-span-2 text-lg">
                <label
                  htmlFor="company-website"
                  className="block font-medium text-slate-900"
                >
                  Select all:
                </label>
                <div className="w-40 flex rounded-md shadow-sm">
                  <input
                    type="checkbox"
                    checked={isCheck}
                    onChange={checkAll}
                    className="inline-flex mt-1 ml-3 items-center rounded-l-md border border-gray-300 bg-gray-50 px-3  text-gray-500 w-6 h-6"
                  />
                  <button
                    className="w-20 ml-4 inline-flex items-center justify-center rounded-md border border-transparent bg-red-600 text-base font-medium text-white hover:bg-red-800"
                    onClick={deleteAll}
                  >
                    Delete All
                  </button>
                </div>
              </div>
            </>
          )}

          <Filters />
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Customers also purchased
          </h2>
          <div className="mt-2 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product) => {
              return (
                <ProductItem
                  key={product._id}
                  product={product}
                  isAdmin={isAdmin}
                  deleteProduct={deleteProduct}
                  handleCheck={handleCheck}
                />
              );
            })}
          </div>
        </div>
      </div>

      <Load />
      {products.length === 0 && <Loading />}
    </>
  );
}

export default Products;
