import React, { useContext, useState, useEffect } from "react";
import { GlobalState } from "../../../GlobalState";
import axios from "axios";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const shippingFee = [
  { value: 50, name: "Standard shipping" },
  { value: 70, name: "Domestical shipping" },
  { value: 100, name: "Foreign country shipping" },
];

function Cart() {
  const state = useContext(GlobalState);
  const [cart, setCart] = state.userAPI.cart;
  const [products, setProducts] = state.productsAPI.products;
  const [token] = state.token;
  const [total, setTotal] = useState(0);
  const [user] = state.userAPI.user;

  useEffect(() => {
    const getTotal = () => {
      const total = cart.reduce((prev, item) => {
        return prev + item.price * item.quantity;
      }, 0);

      setTotal(total);
    };

    getTotal();
  }, [cart]);

  const addToCart = async (cart) => {
    await axios.patch(
      "/user/addcart",
      { cart },
      {
        headers: { Authorization: token },
      }
    );
  };

  const increment = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity += 1;
      }
    });

    setCart([...cart]);
    addToCart(cart);
  };

  const decrement = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity === 1 ? (item.quantity = 1) : (item.quantity -= 1);
      }
    });

    setCart([...cart]);
    addToCart(cart);
  };

  const removeProduct = (id) => {
    if (window.confirm("Do you want to delete this product?")) {
      cart.forEach((item, index) => {
        if (item._id === id) {
          cart.splice(index, 1);
        }
      });

      setCart([...cart]);
      addToCart(cart);
    }
  };

  const tranSuccess = async (paymentID, address) => {
    await axios.post(
      "/api/payment",
      { cart, paymentID, address },
      {
        headers: { Authorization: token },
      }
    );

    setCart([]);
    addToCart([]);
    alert("You have successfully placed an order.");
  };

  if (cart.length === 0)
    return (
      <>
        <div class="p-6 max-w-sm bg-white rounded-lg mt-20 mx-auto">
          <svg
            class="mb-2 w-10 h-10 text-gray-700 dark:text-gray-900"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z"
              clip-rule="evenodd"
            ></path>
            <path d="M9 11H3v5a2 2 0 002 2h4v-7zM11 18h4a2 2 0 002-2v-5h-6v7z"></path>
          </svg>
          <a href="#">
            <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-black">
              Cart Empty
            </h5>
          </a>
          <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
            Go to this step by step guideline process on how to certify for your
            weekly benefits:
          </p>
          <a
            href="/"
            class="inline-flex items-center text-blue-600 hover:underline"
          >
            Go shopping?
            <svg
              class="ml-2 w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
              <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
            </svg>
          </a>
        </div>
      </>
    );
  const paypalOptions = {
    "client-id":
      "AfMl6Mabhsv0lAl8LEXqd4N9fdwnY7ubb7-GxG_G4N-rDuMzlz0FhtohTk6AWfrujRpT7PXxxbZ9KH52",
    intent: "capture",
    currency: "USD",
  };
  const checkedSoftDeletedProducts = (id) => {
    const getResult = products.find((product) => product._id === id);
    return getResult === undefined ? true : false;
  };

  return (
    <>
      <div class="container mx-auto mt-20">
        <div class="flex shadow-md">
          <div class="w-3/5 bg-white px-10 py-10">
            <div class="flex justify-between border-b pb-8">
              <h1 class="font-semibold text-2xl">Shopping Cart</h1>
              <h2 class="font-semibold text-2xl">{cart.length} Items</h2>
            </div>
            <div class="flex mt-10 mb-5">
              <h3 class="font-semibold text-gray-600 text-base uppercase w-2/5">
                Product Details
              </h3>
              <h3 class="font-semibold text-center text-gray-600 text-base uppercase w-1/5">
                Quantity
              </h3>
              <h3 class="font-semibold text-center text-gray-600 text-base uppercase w-1/5">
                Price
              </h3>
              <h3 class="font-semibold text-center text-gray-600 text-base uppercase w-1/5">
                Total
              </h3>
            </div>
            {cart.map((product) => (
              <div class="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
                <div class="flex w-2/5">
                  <div class="w-20" key={product._id}>
                    <img src={product.images.url} alt="" />
                  </div>
                  <div class="flex flex-col justify-between ml-4 flex-grow">
                    <span class="font-bold text-sm">{product.title}</span>
                    <a
                      onClick={() => removeProduct(product._id)}
                      href="#"
                      class="font-semibold hover:text-red-500 text-gray-500 text-sm"
                    >
                      Remove
                    </a>
                    {checkedSoftDeletedProducts(product._id) ? (
                      <span class="text-red-500 text-base" id="unavailable">
                        Out of stock
                      </span>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                <div class="flex justify-center w-1/5">
                  {checkedSoftDeletedProducts(product._id) ? (
                    <input
                      class="mx-2 border text-center w-8"
                      type="text"
                      value={product.quantity}
                      readOnly
                    />
                  ) : (
                    <>
                      <button onClick={() => decrement(product._id)}>
                        <svg
                          class="fill-current text-gray-600 w-3"
                          viewBox="0 0 448 512"
                        >
                          <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                        </svg>
                      </button>
                      <input
                        class="mx-2 border text-center w-8"
                        type="text"
                        value={product.quantity}
                      />
                      <button onClick={() => increment(product._id)}>
                        <svg
                          class="fill-current text-gray-600 w-3"
                          viewBox="0 0 448 512"
                        >
                          <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                        </svg>
                      </button>
                    </>
                  )}
                </div>
                <span class="text-center w-1/5 font-semibold text-sm">
                  {product.price}
                </span>
                <span class="text-center w-1/5 font-semibold text-sm">
                  {product.price * product.quantity}$
                </span>
              </div>
            ))}
            <a
              href="/"
              class="flex font-semibold text-indigo-600 text-sm mt-10"
            >
              <svg
                class="fill-current mr-2 text-indigo-600 w-4"
                viewBox="0 0 448 512"
              >
                <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
              </svg>
              Continue Shopping
            </a>
          </div>

          <div id="summary" class="w-2/5 px-4 py-4 bg-gray-200">
            <h1 class="font-semibold text-2xl border-b-2 border-b-slate-400 pb-8 mt-6">
              Order Summary
            </h1>
            <div class="flex justify-between mt-10 mb-5">
              <span class="font-semibold text-base uppercase">
                Items {cart.length}
              </span>
              <span class="font-semibold text-base">{total}$</span>
            </div>
            <div>
              <label class="font-medium inline-block mb-3 text-base uppercase">
                Shipping
              </label>
              <select class="block p-2 text-gray-600 w-full text-base">
                {shippingFee.map((ship) => (
                  <option value={ship.value}>{ship.name}</option>
                ))}
              </select>
            </div>
            <div class="py-6">
              <label
                for="address"
                class="font-semibold inline-block mb-3 text-base uppercase"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                readOnly
                class="p-2 text-base w-full"
                value={user.address}
              />
            </div>
            <div class="py-">
              <label
                for="phone"
                class="font-semibold inline-block mb-3 text-base uppercase"
              >
                Phone number
              </label>
              <input
                type="text"
                id="phone"
                readOnly
                class="p-2 text-base w-full"
                value={user.phonenumber}
              />
            </div>

            <div class="border-t mt-8">
              <div class="flex font-semibold justify-between py-6 text-sm uppercase">
                <span>Total cost</span>
                <span>${total}</span>
              </div>
              {document.getElementById("unavailable") ? (
                <button
                  class="bg-red-900 font-semibold py-3 text-sm text-white uppercase w-full"
                  disabled
                >
                  Delete unavailable products to checkout
                </button>
              ) : (
                <PayPalScriptProvider options={paypalOptions}>
                  <PayPalButtons
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        purchase_units: [
                          {
                            amount: {
                              value: `${total}`,
                            },
                          },
                        ],
                      });
                    }}
                    onApprove={(data, actions) => {
                      const paymentID = data.paymentID;
                      const orderID = data.orderID;
                      return tranSuccess(paymentID, orderID);
                    }}
                  />
                </PayPalScriptProvider>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
