import {
  ArrowUpTrayIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import React, { useContext } from "react";
import { GlobalState } from "../../../GlobalState";

function UserDetails() {
  const state = useContext(GlobalState);
  const [userDetail] = state.userAPI.user;
  return (
    <div className="mt-20">
      <header className="bg-white shadow">
        <div class="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          {userDetail.avatar ? (
            <img
              class="w-20 h-20 rounded-md"
              src={userDetail.avatar.url}
              alt=""
            />
          ) : (
            <img
              class="w-20 h-20 rounded-md"
              src="https://cdn-icons-png.flaticon.com/512/168/168726.png"
              alt=""
            />
          )}

          <div class="font-medium text-xl dark:text-black">
            <div>{userDetail.email}</div>
          </div>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          {/* Replace with your content */}
          <div className="px-4 py-6 sm:px-0">
            <div className="overflow-hidden shadow sm:rounded-lg">
              <div className="border-t border-gray-200">
                <dl>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-xl font-medium text-gray-500">
                      <p>{userDetail.name}</p>
                    </dt>
                    <dd className="mt-1 text-lg text-gray-900 sm:col-span-2 sm:mt-0">
                      <button className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        <PencilIcon
                          className="-ml-1 mr-2 h-5 w-5 text-gray-500"
                          aria-hidden="true"
                        />
                        <a href={`/edit_user/${userDetail._id}`}>Edit</a>
                      </button>
                    </dd>
                    <div className="border-t border-gray-200"></div>
                  </div>
                </dl>
                <dl>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-xl font-medium text-gray-500">
                      <p>{userDetail.phonenumber}</p>
                    </dt>
                    <dd className="mt-1 text-lg text-gray-900 sm:col-span-2 sm:mt-0">
                      <button className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        <PencilIcon
                          className="-ml-1 mr-2 h-5 w-5 text-gray-500"
                          aria-hidden="true"
                        />
                        <a href={`/edit_user/${userDetail._id}`}>Edit</a>
                      </button>
                    </dd>
                    <div className="border-t border-gray-200"></div>
                  </div>
                </dl>
                <dl>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-xl font-medium text-gray-500">
                      <p>{userDetail.address}</p>
                    </dt>
                    <dd className="mt-1 text-lg text-gray-900 sm:col-span-2 sm:mt-0">
                      <button className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        <PencilIcon
                          className="-ml-1 mr-2 h-5 w-5 text-gray-500"
                          aria-hidden="true"
                        />
                        <a href={`/edit_user/${userDetail._id}`}>Edit</a>
                      </button>
                    </dd>
                    <div className="border-t border-gray-200"></div>
                  </div>
                </dl>
                <dl>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <div class="max-w-7xl">
                      {userDetail.avatar ? (
                        <img
                          class="w-20 h-20 rounded-md"
                          src={userDetail.avatar.url}
                          alt=""
                        />
                      ) : (
                        <img
                          class="w-20 h-20 rounded-md"
                          src="https://cdn-icons-png.flaticon.com/512/168/168726.png"
                          alt=""
                        />
                      )}
                    </div>
                    <dd className="mt-1 text-lg text-gray-900 sm:col-span-2 sm:mt-0">
                      <button className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        <ArrowUpTrayIcon
                          className="-ml-1 mr-2 h-5 w-5 text-gray-500"
                          aria-hidden="true"
                        />
                        <a href={`/edit_user/${userDetail._id}`}>Upload</a>
                      </button>
                    </dd>
                    <div className="border-t border-gray-200"></div>
                  </div>
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

export default UserDetails;
