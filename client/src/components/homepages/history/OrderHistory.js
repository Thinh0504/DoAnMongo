import React, { useContext, useEffect } from "react";
import { GlobalState } from "../../../GlobalState";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  CheckBadgeIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";

function OrderHistory() {
  const state = useContext(GlobalState);
  const [history, setHistory] = state.userAPI.history;
  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;

  useEffect(() => {
    if (token) {
      const getHistory = async () => {
        if (isAdmin) {
          const res = await axios.get("/api/payment", {
            headers: { Authorization: token },
          });
          setHistory(res.data);
        } else {
          const res = await axios.get("/user/history", {
            headers: { Authorization: token },
          });
          setHistory(res.data);
        }
      };
      getHistory();
    }
  }, [token, isAdmin, setHistory]);

  return (
    <>
      <div className="mt-20">
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="inline-flex text-3xl font-bold tracking-tight text-gray-900">
              History
            </h1>
            <button className="ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-1 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              <CheckBadgeIcon
                className="-ml-1 mr-2 h-5 w-5 text-gray-500"
                aria-hidden="true"
              />
              <a href="#"> You have {history.length} ordered</a>
            </button>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            {/* Replace with your content */}
            <div className="px-4 py-6 sm:px-0">
              <div className="overflow-hidden shadow sm:rounded-lg">
                <table class="m-auto w-1/2 border border-solid border-black border-collapse">
                  <thead class=" border border-solid  border-black">
                    <tr class="border-solid border border-black border-collapse">
                      <th class="border-solid border border-black text-center border-collapse p-10 capitalize">
                        Payment ID
                      </th>
                      <th class="border-solid border border-black text-center border-collapse p-10 capitalize">
                        Date of Purchased
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.map((items) => (
                      <tr
                        key={items._id}
                        class="border-solid border border-black text-center border-collapse"
                      >
                        <td class="border-solid border border-black text-center border-collapse p-10 capitalize">
                          {items.paymentID}
                        </td>
                        <td class="border-solid border border-black text-center border-collapse p-10 capitalize">
                          {new Date(items.createdAt).toLocaleDateString()}
                        </td>
                        <td class="border-solid border border-black text-center border-collapse p-10 capitalize">
                          <Link to={`/history/${items._id}`}>View</Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {/* /End replace */}
          </div>
        </main>
      </div>
    </>
  );
}

export default OrderHistory;
