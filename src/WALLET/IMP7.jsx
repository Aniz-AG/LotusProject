// import React, { useState } from "react";
import topBackground from "../Images/bg.png";
import search from '../Images/search.png';
import Transaction from "./Transaction";
import Wallet from "./Wallet";

function IMP7() {

  const topStyle = {
    backgroundImage: `url(${topBackground})`,
    backgroundSize: "cover",
    height: "100% ", // Set the height of the div
    width: "100%", // Set the width of the div
    paddingTop:'50px', 
    paddingBottom:'100px'
  };

  return (
    <>
<div className="relative">
        <div className="sticky top-0" >
          <Wallet/>
        </div>

        {/* <div className="  text-white flex flex-col  " style={topStyle}>
          {console.log('')}
          <Transaction />
        </div> */}
      </div>
    

      </>
  );
}

export default IMP7;
