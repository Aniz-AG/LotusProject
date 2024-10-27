import React, { useState } from "react";
import Bid from "./Bid";
import Biddata from "./Biddata";
import { GoCircleSlash } from "react-icons/go";

function IMP4() {
  const [fetchResultStatus, setFetchResultStatus] = useState(false);
  const [fetchResultData, setFetchResultData] = useState(null);

  const handleDataFetch = (status, data) => {
    setFetchResultStatus(status);
    setFetchResultData(data);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-my-gradient-1 flex-grow">
        <div className="sticky top-0 bg-my-gradient-1">
          <Bid onDataFetch={handleDataFetch} />
        </div>

        <div className="text-black bg-my mt-5">
          <div className="m-auto w-[250px] bg-yellow-500 rounded-full text-white text-lg font-bold text-center py-2">
            WIN History
          </div>

          {fetchResultStatus && fetchResultData ? (
            fetchResultData.bid_data.map((item, index) => (
              <Biddata key={index} data={item} />
            ))
          ) : (
            <div className="flex flex-col justify-center items-center py-5">
              <GoCircleSlash className="w-16 h-16 text-blue-500" />
              <p>NO DATA FOUND</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default IMP4;
