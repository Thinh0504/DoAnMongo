import React from "react";
import BtnRender from "./ButtonRender";

function ProductItem({ product, isAdmin, deleteProduct, handleCheck }) {
  return (
    <>
      <div className="group relative">
        <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
          <img
            src={product.images.url}
            alt="Gaming Gear"
            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
          />
        </div>
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900 ">
              <span aria-hidden="true" className="absolute inset-0" />
              {product.title}
            </h3>
            <p className="mt-1 text-lg text-slate-600">{product.description}</p>
          </div>
          <p className="text-xl font-medium text-white bg-red-800 px-3 h-8 rounded-md">
            {product.price}$
          </p>
        </div>
        <div className="mt-6 flex group relative">
          <BtnRender product={product} deleteProduct={deleteProduct} />
          {isAdmin && (
            <input
              type="checkbox"
              checked={product.checked}
              onChange={() => handleCheck(product._id)}
              className="inline-flex mt-4 ml-3 items-center rounded-l-md border border-gray-300 bg-gray-50 px-3  text-gray-500 w-6 h-6"
            />
          )}
        </div>
      </div>
    </>
  );
}

export default ProductItem;
