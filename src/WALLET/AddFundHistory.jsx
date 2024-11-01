import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useTransaction from "../Hooks/useTransaction"; // Import your custom hook

function AddFundHistory() {
  const [deposits, setDeposits] = useState([]);
  const [error, setError] = useState('');
  const token = useSelector(state => state.userDetail.token);
  const resinfo = useTransaction(token); // Fetch transaction data using the custom hook

  useEffect(() => {
    if (resinfo && resinfo["transaction_history"]) {
      console.log("All transaction:",resinfo["transaction_history"])
      // Filter transactions where transaction_type is '1'
      const filteredDeposits = resinfo["transaction_history"].filter(deposit => deposit.transaction_type === '1' && deposit.amount_status=='1');
      console.log("Filtered deposits:",filteredDeposits);
      setDeposits(filteredDeposits);
      console.log("Filtered Deposits:", filteredDeposits);
    } else {
      setDeposits([]);
    }
  }, [resinfo]); // Run effect when resinfo changes

  return (
    <div className="min-h-screen bg-my-gradient-1 flex justify-center mx-auto py-4">
      <div className="mx-auto flex flex-col items-center">
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <h2 className="text-xl font-bold mb-4 text-white">Add Funds History</h2>
        
        <ul className="w-full">
          {deposits.length > 0 ? (
            deposits.map((deposit, index) => (
              <li key={index} className="bg-white p-4 mb-2 rounded-lg shadow">
                <p><strong>ID:</strong> {deposit.transaction_id}</p>
                <p><strong>Amount:</strong><span  className="text-green-800 font-bold">+{deposit.amount}</span></p>
                <p>
                  <strong>Status:</strong> 
                  {deposit.amount_status === '1' 
                    ? <span className="text-green-800 font-bold">Approved</span> 
                    : deposit.amount_status}
                </p>
                {/* <p><strong>Note:</strong> {deposit.transaction_note}</p> */}
                <p><strong>Date:</strong> {deposit.insert_date}</p>
              </li>
            ))
          ) : (
            <p>No add fund transactions found.</p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default AddFundHistory;
