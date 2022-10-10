import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../../../../GlobalState";

function ButtonRender({ product, deleteProduct }) {
  const state = useContext(GlobalState);
  const [isAdmin] = state.userAPI.isAdmin;
  const addCart = state.userAPI.addCart;

  return (
    <>
      {isAdmin ? (
        <>
          <div className="inline-flex rounded-md shadow">
            <Link
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-5 py-3 text-base font-medium text-white hover:bg-indigo-700"
              to="#!"
              onClick={() =>
                deleteProduct(product._id, product.images.public_id)
              }
            >
              Delete
            </Link>
          </div>
          <div className="ml-3 inline-flex rounded-md shadow">
            <Link
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-white px-5 py-3 text-base font-medium text-indigo-600 hover:bg-indigo-50"
              to={`/edit_product/${product._id}`}
            >
              Edit
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className="inline-flex rounded-md shadow w-20 h-10">
            <Link
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-5 py-3 text-base font-medium text-white hover:bg-indigo-700 w-20 h-10"
              to="#!"
              onClick={() => addCart(product)}
            >
              Buy
            </Link>
          </div>
          <div className="ml-3 inline-flex rounded-md shadow w-20 h-10">
            <a
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-white px-5 py-3 text-base font-medium text-indigo-600 hover:bg-indigo-50 w-20 h-10"
              href={`/detail/${product._id}`}
            >
              View
            </a>
          </div>
        </>
      )}
    </>
  );
}

export default ButtonRender;
