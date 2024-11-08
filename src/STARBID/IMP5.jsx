import React, { useState } from "react";
import Starbid from "./Starbid";
import Starbiddata from "./Starbiddata"; // Ensure this component is defined
import { GoCircleSlash } from "react-icons/go";

function IMP5() {
  const [fetchResultStatus, setFetchResultStatus] = useState(false);
  const [fetchResultData, setFetchResultData] = useState(null); // State to store fetch result

  // Function to update fetch result status and data
  const handleDataFetch = (status, data) => {
    setFetchResultStatus(status);
    setFetchResultData(data);
    console.log(data);
  };

  return (
    <div className="bg-my-gradient-1 h-[100vh] mt-[-8px] overflow-auto">
      <div className="sticky top-0 bg-my-gradient-1">
        <Starbid onDataFetch={handleDataFetch} />
      </div>

      <div className="h-[100vh] ">
        {fetchResultStatus && fetchResultData ? (
          fetchResultData.bid_data.map((item, index) => (
            <Starbiddata key={index} data={item} />
          ))
        ) : (
          <div className="flex flex-col justify-center items-center py-5">
            <div className="flex items-start justify-center">
              <GoCircleSlash className="w-16 h-16 text-blue-500" />
            </div>
            <p>NO DATA FOUND</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default IMP5;
