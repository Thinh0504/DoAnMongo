import { PencilIcon, TrashIcon } from "@heroicons/react/20/solid";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import React, { useContext, useState } from "react";
import { GlobalState } from "../../../GlobalState";
import Load from "./Load";

function ProductList() {
  const state = useContext(GlobalState);
  const [products] = state.productsAPI.products;

  return (
    <div className="mt-20">
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="inline-flex text-3xl font-bold tracking-tight text-gray-900">
            Products
          </h1>
          <button className="ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-1 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            <CheckBadgeIcon
              className="-ml-1 mr-2 h-5 w-5 text-gray-500"
              aria-hidden="true"
            />
            <a href="/create_product">Create Product</a>
          </button>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          {/* Replace with your content */}
          <div className="px-4 py-6 sm:px-0">
            <div className="overflow-hidden shadow sm:rounded-lg">
              <div className="border-t border-gray-200">
                <dl>
                  {products.map((product) => (
                    <div
                      className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                      key={product._id}
                    >
                      <dt className="text-xl font-medium text-gray-500">
                        <p>{product.title}</p>
                      </dt>
                      <dd className="mt-1 text-lg text-gray-900 sm:col-span-2 sm:mt-0">
                        <button className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                          <PencilIcon
                            className="-ml-1 mr-2 h-5 w-5 text-gray-500"
                            aria-hidden="true"
                          />
                          <a href={`/edit_product/${product._id}`}>Edit</a>
                        </button>

                        <button className="ml-3 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                          <TrashIcon
                            className="-ml-1 mr-2 h-5 w-5"
                            aria-hidden="true"
                          />
                          <a href={`/delete_product/${product._id}`}>Delete</a>
                        </button>
                      </dd>
                      <div className="border-t border-gray-200"></div>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
            <Load />
          </div>

          {/* /End replace */}
        </div>
      </main>
    </div>
  );
}

export default ProductList;
