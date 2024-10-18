// import React, { useState } from "react";
import topBackground from "../Images/bg.png";
import search from '../Images/search.png';
import WithdrawHistory from "./WithdrawHistory";
import WithdrawFund from "./WithdrawFund";

function IMP8() {

  const topStyle = {
    backgroundImage: `url(${topBackground})`,
    backgroundSize: "cover",
    height: "auto ", // Set the height of the div
    width: "100%", // Set the width of the div
    paddingTop:'50px', 
    paddingBottom:'100px'
  };

  return (
    <>
<div className="relative">
        <div className="sticky top-0" >
          <WithdrawFund/>
        </div>

        {/* <div className="  text-white flex flex-col  " style={topStyle}>
          {console.log('')}
          <WithdrawHistory />
        </div> */}
      </div>
    

      </>
  );
}

export default IMP8;
