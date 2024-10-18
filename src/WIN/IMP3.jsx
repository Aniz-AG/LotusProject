import React, { useState } from "react";
import Win from "./Win";
import Windata from "./Windata";
import { GoCircleSlash } from "react-icons/go";

function IMP3() {
  const [fetchResultStatus, setFetchResultStatus] = useState(false);
  const [fetchResultData, setFetchResultData] = useState(null); // State to store fetch result

  // Function to update fetch result status and data
  const handleDataFetch = (status, data) => {
    setFetchResultStatus(status);
    setFetchResultData(data);
    console.log(data);
  };

  return (
    <div className="bg-my-gradient-1 min-h-screen p-5"> {/* Apply the gradient background */}
      <div className="relative">
        <div className="sticky top-0">
          <Win onDataFetch={handleDataFetch} /> {/* Pass the function as prop */}
          
          <div className="text-black">
            {fetchResultStatus && fetchResultData ? (
              fetchResultData.win_data.map((item, index) => (
                <Windata key={index} data={item} />
              ))
            ) : (
              <div className="flex flex-col justify-center items-center py-5"> 
                <div className="flex items-start justify-center">
                  <GoCircleSlash className="w-16 h-16 text-blue-500" />
                </div>
                <p className="text-lg font-bold">NO DATA FOUND</p> {/* Bold text for no data found */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default IMP3;
