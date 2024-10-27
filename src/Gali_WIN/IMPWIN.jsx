import React, { useState } from "react";
import Win from "./Win";
import Windata from "./Windata";
import { GoCircleSlash } from "react-icons/go";

function IMPWIN() {
  const [fetchResultStatus, setFetchResultStatus] = useState(false);
  const [fetchResultData, setFetchResultData] = useState(null); // State to store fetch result

  // Function to update fetch result status and data
  const handleDataFetch = (status, data) => {
    setFetchResultStatus(status);
    setFetchResultData(data);
    console.log(data);
  };

  return (
    <div className="relative bg-my-gradient-1 h-[100vh] mt-[-8px] overflow-hidden">
      <div className="sticky top-0">
        <Win onDataFetch={handleDataFetch} /> {/* Pass the function as prop */}
      </div>

      <div className="text-black h-[calc(100vh-100px)] overflow-y-auto"> {/* Adjust height for scrolling */}
        {/* Conditionally render Windata components or the no data message */}
        {fetchResultStatus && fetchResultData ? (
          fetchResultData.bid_data.map((item, index) => (
            <Windata key={index} data={item} />
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

export default IMPWIN;
