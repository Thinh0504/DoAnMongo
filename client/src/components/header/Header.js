import { GlobalState } from "../../GlobalState";
import { Fragment, useContext, useState } from "react";
import { Popover, Transition, Disclosure, Menu } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  ShoppingCartIcon,
  BellIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import axios from "axios";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;
  const [cart] = state.userAPI.cart;
  const [user] = state.userAPI.user;
  const [menu, setMenu] = useState(false);

  const logoutUser = async () => {
    await axios.get("/user/logout");

    localStorage.removeItem("firstLogin");

    window.location.href = "/";
  };

  const adminRouter = () => {
    return (
      <>
        <a
          className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-xl font-medium"
          href="/product"
        >
          Product list
        </a>

        <a
          className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-xl font-medium"
          href="/category"
        >
          Category list
        </a>
      </>
    );
  };

  const loggedRouter = () => {
    return (
      <>
        <Link
          className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-xl font-medium"
          to="#"
        >
          About us
        </Link>
      </>
    );
  };

  return (
    <Disclosure
      as="nav"
      className="bg-white px-2 sm:px-4 dark:bg-gray-700 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600 shadow-slate-800 shadow-md"
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <h2 className="text-gray-50 font-medium text-4xl border border-slate-400 rounded-md px-2">
                    Gaming Gear
                  </h2>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {isAdmin ? (
                      <a
                        href="/"
                        className="bg-gray-900 text-white px-3 py-2 rounded-md text-xl font-medium"
                      >
                        Products
                      </a>
                    ) : (
                      <a
                        href="/"
                        className="bg-gray-900 text-white px-3 py-2 rounded-md text-xl font-medium"
                      >
                        Shop
                      </a>
                    )}

                    {isLogged ? (
                      loggedRouter()
                    ) : (
                      <a
                        href="/login"
                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-xl font-medium"
                      >
                        Login ??? Register
                      </a>
                    )}
                    {isAdmin && adminRouter()}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {isLogged ? (
                  isAdmin ? (
                    <h3 className="bg-gray-900 text-white px-3  border-slate-600 border py-2 rounded-md text-xl font-medium">
                      Admin
                    </h3>
                  ) : (
                    <>
                      <a
                        href="/cart"
                        className="rounded-full bg-gray-700 p-1 text-gray-400 hover:text-white "
                      >
                        <ShoppingCartIcon
                          className="h-10 w-10 inline-flex"
                          aria-hidden="true"
                        ></ShoppingCartIcon>
                        <span className="text-red-400 text-2xl px-2 bg-slate-900 font-medium rounded">
                          {cart.length}
                        </span>
                      </a>
                      <h3 className="bg-gray-900 text-white px-3 border-slate-600 border py-2 ml-6 rounded-md text-xl font-medium">
                        {user.name}
                      </h3>
                    </>
                  )
                ) : (
                  <></>
                )}

                {isLogged ? (
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="sr-only">Open user menu</span>
                        {user.avatar ? (
                          <img
                            className="h-8 w-8 rounded-full"
                            src={user.avatar.url}
                            alt=""
                          />
                        ) : (
                          <img
                            className="h-8 w-8 rounded-full"
                            src="https://cdn-icons-png.flaticon.com/512/168/168726.png"
                            alt=""
                          />
                        )}
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="/user"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-base text-gray-700"
                              )}
                            >
                              Your Profile
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="/history"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-base text-gray-700"
                              )}
                            >
                              History
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              onClick={logoutUser}
                              href="#"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-base text-gray-700"
                              )}
                            >
                              Sign out
                            </a>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              <Disclosure.Button className="w-full">
                {isAdmin ? (
                  <a
                    href="/"
                    className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
                  >
                    Products
                  </a>
                ) : (
                  <a
                    href="/"
                    className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
                  >
                    Shop
                  </a>
                )}
                {isAdmin && adminRouter()}
                {isLogged ? (
                  loggedRouter()
                ) : (
                  <a
                    href="/login"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  >
                    Login ??? Register
                  </a>
                )}
              </Disclosure.Button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
