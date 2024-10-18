import React, { useState } from "react";
import Starwin from "./Starwin";
import Starwindata from "./Starwindata";
import topBackground from "../Images/bg.png";
import search from '../Images/search.png';

import { GoCircleSlash } from "react-icons/go";

function IMP6() {
  const [fetchResultStatus, setFetchResultStatus] = useState(false);
  const [fetchResultData, setFetchResultData] = useState(null); // State to store fetch result

  // Function to update fetch result status and data
  const handleDataFetch = (status, data) => {
    setFetchResultStatus(status);
    setFetchResultData(data);
    console.log(data);
  };

  const topStyle = {
    backgroundImage: `url(${topBackground})`,
    backgroundSize: "cover",
    height: "auto", // Set the height of the div
    width: "100%", // Set the width of the div
    paddingBottom: "300px",
  };

  return (
    <>
      <div className="relative h-[100vh] bg-my-gradient-1 mt-[-8px]">
        <div className="sticky top-0">
          <Starwin onDataFetch={handleDataFetch} /> {/* Pass the function as prop */}
        </div>

        <div className="text-black" >
          {/* <p className="text-center">Win History</p> */}
          {/* Conditionally render Windata components or the search image */}
          {fetchResultStatus && fetchResultData ? (
            fetchResultData.win_data.map((item, index) => (
              <Biddata key={index} data={item} />
            ))
          ) : (
            // <img  className="h-48 w-48 absolute left-1/2 transform -translate-x-1/2   " alt="Search" />
            <div className=" flex flex-col justify-center items-center py-5"> 
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

export default IMP6;
