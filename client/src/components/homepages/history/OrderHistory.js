import React, { useContext, useEffect } from 'react';
import { GlobalState } from '../../../GlobalState';
import { Link } from 'react-router-dom';
import axios from 'axios';

function OrderHistory() {
  const state = useContext(GlobalState);
  const [history, setHistory] = state.userAPI.history;
  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;

  useEffect(() => {
    if (token) {
      const getHistory = async () => {
        if (isAdmin) {
          const res = await axios.get('/api/payment', {
            headers: { Authorization: token },
          });
          setHistory(res.data);
        } else {
          const res = await axios.get('/user/history', {
            headers: { Authorization: token },
          });
          setHistory(res.data);
        }
      };
      getHistory();
    }
  }, [token, isAdmin, setHistory]);

  return (
    <div className="history-page" class="overflow-auto">
      <h2 class="text-center m-20 capitalize md:uppercase tracking-[1.2px]">
        History
      </h2>

      <h4 class="text-center m-20 capitalize md:uppercase tracking-[1.2px]">
        You have {history.length} ordered
      </h4>

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
  );
}

export default OrderHistory;
