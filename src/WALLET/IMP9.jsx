// import React, { useState } from "react";
import topBackground from "../Images/bg.png";
import search from '../Images/search.png';
import AddFundHistory from "./AddFundHistroy";
import AddFund from "./AddFund";

function IMP9() {

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
          <AddFund/>
        </div>

        {/* <div className="  text-white flex flex-col -mt-8  " style={topStyle}>
          {console.log('Hello')}
          <AddFundHistory />
        </div> */}
      </div>
    

      </>
  );
}

export default IMP9;
