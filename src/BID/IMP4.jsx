import React, { useState } from "react";
import Bid from "./Bid";
import Biddata from "./Biddata";
import topBackground from "../Images/bg.png";
import { GoCircleSlash } from "react-icons/go";

function IMP4() {
  const [fetchResultStatus, setFetchResultStatus] = useState(false);
  const [fetchResultData, setFetchResultData] = useState(null);

  const handleDataFetch = (status, data) => {
    setFetchResultStatus(status);
    setFetchResultData(data);
    console.log(data);
  };

  return (
    <>
      <div className="relative bg-my-gradient-1 h-[100vh] mt-[-8px]">
        <div className="sticky top-0 bg-my-gradient-1">
          <Bid onDataFetch={handleDataFetch} />
        </div>

        <div className="text-black bg-my mt-5">
          {/* Heading for Bid History */}
          <div className=" m-auto w-[250px] bg-yellow-500 rounded-full text-white text-lg font-bold text-center py-2">
            WIN History
          </div>

          {fetchResultStatus && fetchResultData ? (
            fetchResultData.bid_data.map((item, index) => (
              <Biddata key={index} data={item} />
            ))
          ) : (
            <div className="flex flex-col justify-center items-center py-5"> 
              <div className="flex items-start justify-center">
                <GoCircleSlash className="w-16 h-16 text-blue-500" />
              </div>
              <p> NO DATA FOUND </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default IMP4;
