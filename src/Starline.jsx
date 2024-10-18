import { Link, Navigate, useNavigate } from "react-router-dom";
import topBackground from "./Images/bg.png";
import { BiArrowBack } from "react-icons/bi";
import starMarker from "./Images/strline_market.png";
import { useState, useEffect } from "react";
import useStarGameRate from "./Hooks/useStarGameRate";
import useStarline from "./Hooks/useStarline";
import { FaHistory } from "react-icons/fa";
import { FaChartSimple } from "react-icons/fa6";
function Starline() {
  const backStyle = {
    // backgroundImage: `url(${topBackground})`,
    backgroundSize: "cover", // This will make the background image cover the container without
    paddingBottom: "30px",
  };
  const navbarStyle = {
    height: "60px",
    display: "flex",
    // ali4nItemswhite
  };
  const btnStyle = {
    background: "linear-gradient(to right, #141384, #000000)",
    width: "150px",
    padding: "7px",
    borderRadius: "15px",
    margin: "10px 10px 0 10px",
  };

  const box1 = {
    alignItems: "center",
    justifyContent: "center",
  };

  const priceStyle = {
    background: "linear-gradient(to right, #141384, #000000)",
    height: "180px",
    width: "500px",
    margin: "20px 20px 0 10px",
    borderRadius: "20px",
  };

  const marker = {
    margin: "20px 20px -20px 20px",
    display: "flex",
    justifyContent: "center",
  };

  const navigate = useNavigate();
  const back = () => {
    navigate("/imp");
  };

  const [status, setStatus] = useState(false);
  const [gameRates, setGameRates] = useState([]);
  const [status1, setStatus1] = useState(false);
  const [gameRates1, setGameRates1] = useState([]);

  const resinfo1 = useStarline();
  const resinfo = useStarGameRate();

  useEffect(() => {
    if (resinfo && resinfo["game_rates"]) {
      setStatus(true);
      setGameRates(resinfo["game_rates"][0]);
    }
  }, [resinfo]);
  useEffect(() => {
    if (resinfo1 && resinfo1["result"]) {
      setStatus1(true);
      setGameRates1(resinfo1["result"]);
    }
  }, [resinfo1]);
  const handleClick = () => {
    // window.location.href = resinfo1['web_starline_chart_url'];
    window.open(resinfo1["web_starline_chart_url"], "_blank");
  };

  return (
    <>
      <div className="px-2">
        <div className="font-bold flex items-center justify-center text-lg mt-2 underline">
          <h3>JACKPOT STARLINE</h3>
        </div>

        <div style={backStyle}>
          <div className="w-120">
            <div className="flex items-center justify-center pt-2 mb-2">
              <div
                onClick={() => navigate("/imp5")}
                className="w-1/3 mr-2 bg-my-gradient border-1 text-white rounded-xl border-yellow-600  flex items-center justify-center  z-4 hover:shadow-lg shadow-md"
              >
                <button className="flex flex-col py-2 px-1 items-center justify-center">
                  <p className="font-bold">Bid-History</p>{" "}
                  <FaHistory className="text-2xl" />
                </button>{" "}
              </div>
              <div
                onClick={() => navigate("/imp6")}
                className="w-1/3 mr-2 bg-my-gradient border-1 text-white rounded-xl border-yellow-600  flex items-center justify-center  z-4 hover:shadow-lg shadow-md"
              >
                {" "}
                <button className="flex flex-col py-2 px-1 items-center justify-center">
                  <p className="font-bold">Win History</p>{" "}
                  <FaHistory className="text-2xl" />
                </button>{" "}
              </div>
              <div
                onClick={handleClick}
                className="w-1/3 mr-2 bg-my-gradient border-1 text-white rounded-xl border-yellow-600  flex items-center justify-center  z-4 hover:shadow-lg shadow-md"
              >
                {" "}
                <button
                  onClick={handleClick}
                  className="flex flex-col py-2 px-1 items-center justify-center"
                >
                  <p className="font-bold">Chart</p>{" "}
                  <FaChartSimple className="text-2xl" />
                </button>{" "}
              </div>
            </div>
            {/* <div className="flex " style={box1}>
                <button
                  className="text-white rounded border border-white  "
                  style={btnStyle}
                  onClick={() => navigate("/imp5")}
                >
                  Bid History
                </button>
                <button
                  className="text-white rounded border border-white  "
                  style={btnStyle}
                  onClick={() => navigate("/imp6")}
                >
                  WIN History
                </button>
                <button
                  className="text-white rounded border border-white"
                  style={btnStyle}
                  onClick={handleClick}
                >
                  CHART
                </button>
              </div> */}
            <div className="flex flex-col justify-center w-120 text-white bg-my-gradient border font-bold z-4 shadow-md p-2  rounded">
              <div className="flex  justify-evenly items-center ">
                <p className="-ml-2">Single Digit</p>
                <p className="ml-1">:-</p>
                <p>
                  {gameRates["single_digit_val_1"]}-
                  {gameRates["single_digit_val_2"]}
                </p>
              </div>

              <div className="flex   justify-evenly items-center ">
                <p className="-ml-1"> Single Panna</p>
                <p className="">:-</p>
                <p>
                  {gameRates["single_pana_val_1"]}-
                  {gameRates["single_pana_val_2"]}
                </p>
              </div>

              <div className="flex   justify-evenly items-center">
                <p className="-ml-2">Double Panna </p>
                <p className="-ml-1">:-</p>
                <p>
                  {gameRates["double_pana_val_1"]}-
                  {gameRates["double_pana_val_2"]}
                </p>
              </div>
              <div className="flex   justify-evenly items-center">
                <p className="-ml-2">Tripple Panna </p>
                <p className="-ml-1">:-</p>
                <p>
                  {gameRates["tripple_pana_val_1"]}-
                  {gameRates["tripple_pana_val_2"]}
                </p>
              </div>
            </div>
            {/* <div className="flex justify-center align-items-center">
              <div style={priceStyle} className="px-5 py-2 text-white border border-white">
                
              <div className="flex flex-row justify-between p-2">
              <p>Single Digit</p>
              <p>:-</p>
              <p>{gameRates['single_digit_val_1']}-{gameRates['single_digit_val_2']}</p>
              </div>


              
              <div className="flex flex-row justify-between p-2">
              <p>Single Panna</p>
              <p>:-</p>
              <p>{gameRates['single_pana_val_1']}-{gameRates['single_pana_val_2']}</p>
              </div>

              <div className="flex flex-row justify-between p-2">
              <p>Double Panna</p>
              <p>:-</p>
              <p>{gameRates['double_pana_val_1']}-{gameRates['double_pana_val_2']}</p>
              </div>



              <div className="flex flex-row justify-between p-2">
              <p>Tripple Panna</p>
              <p>:-</p>
              <p>{gameRates['tripple_pana_val_1']}-{gameRates['tripple_pana_val_2']}</p>
              </div>

              </div>
              </div> */}
          </div>
          {/* <div style={marker}>
                <img src={starMarker} alt="" />
            </div> */}
        </div>
      </div>
    </>
  );
}

export default Starline;
