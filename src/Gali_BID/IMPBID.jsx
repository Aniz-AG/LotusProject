import React, { useState } from "react";
import Bid from "./Bid";
import Biddata from "./Biddata";
import { GoCircleSlash } from "react-icons/go";

function IMPBID() {
  const [fetchResultStatus, setFetchResultStatus] = useState(false);
  const [fetchResultData, setFetchResultData] = useState(null); // State to store fetch result

  // Function to update fetch result status and data
  const handleDataFetch = (status, data) => {
    setFetchResultStatus(status);
    setFetchResultData(data);
  };

  return (
    <div className="relative bg-my-gradient-1 h-[100vh] mt-[-8px] overflow-hidden">
      <div className="sticky top-0">
        <Bid onDataFetch={handleDataFetch} />
      </div>

      <div className="text-black overflow-y-auto h-[calc(100vh-100px)]">
        {fetchResultStatus && fetchResultData ? (
          fetchResultData.bid_data.map((item, index) => (
            <Biddata key={index} data={item} />
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

export default IMPBID;
