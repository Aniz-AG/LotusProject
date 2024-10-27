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
    <div className="relative bg-my-gradient-1 h-screen flex flex-col"> {/* Full height with flexbox */}
      {/* Fixed Date Selector Section */}
      <div className="sticky top-0">
        <Win onDataFetch={handleDataFetch} /> {/* Pass the function as prop */}
      </div>

      {/* Scrollable Data Section */}
      <div className="flex-grow overflow-y-auto"> {/* Allow this section to grow and be scrollable */}
        {fetchResultStatus && fetchResultData ? (
          fetchResultData.win_data.length > 0 ? (
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
          )
        ) : (
          <div className="flex flex-col justify-center items-center py-5"> 
            <div className="flex items-start justify-center">
              <GoCircleSlash className="w-16 h-16 text-blue-500" />
            </div>
            <p className="text-lg font-bold">NO DATA FOUND</p> {/* Bold text for no data found */}
          </div>
        )}
      </div>

      {/* Fixed Footer */}
      {/* <footer className="bg-white p-4 text-center"> Ensure footer is fixed at the bottom */}
        {/* Your footer content here */}
        {/* <p>Footer Content Here</p> */}
      {/* </footer> */}
    </div>
  );
}

export default IMP3;
