import { Link, Navigate, useNavigate } from "react-router-dom";
// import topBackground from "./Images/new1.jpg";
import { BiArrowBack } from "react-icons/bi";
import starMarker from "./Images/strline_market.png";
import useStarGameRate from "./Hooks/useStarGameRate";
import useStarline from "./Hooks/useStarline";
import { useState, useEffect } from "react";
import useGaliGameRates from "./Hooks/useGaliGameRates";
import useGaliGameFront from "./Hooks/useGaliGameFront";
import { FaHistory } from "react-icons/fa";
import { FaChartSimple } from "react-icons/fa6";
function GALIRATES() {
  const backStyle = {
    // backgroundImage: `url(${topBackground})`,
    backgroundSize: "cover", // This will make the background image cover the container without
    paddingBottom: "10px",
    paddingTop: "0px",
  };
  const navbarStyle = {
    height: "60px",
    display: "flex",
    alignItems: "center",
  };
  const btnStyle = {
    background: "linear-gradient(to right, #141384, #000000)",
    width: "150px",
    padding: "7px",
    borderRadius: "15px",
    margin: "20px 10px 0 0px",
  };

  const box1 = {
    alignItems: "center",
    justifyContent: "center",
  };

  const priceStyle = {
    background: "linear-gradient(to right, #141384, #000000)",
    height: "140px",
    width: "500px",
    margin: "20px 10px 0 30px",
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
  const handleClick = () => {
    window.open(resinfo1["web_galidessar_chart_url"], "_blank");
  };

  const [status, setStatus] = useState(false);
  const [gameRates, setGameRates] = useState([]);
  const [status1, setStatus1] = useState(false);
  const [gameRates1, setGameRates1] = useState([]);
  const resinfo = useGaliGameRates();
  const resinfo1 = useGaliGameFront();
  useEffect(() => {
    if (resinfo1 && resinfo1["result"]) {
      setStatus1(true);
      setGameRates1(resinfo1["result"]);
    }
  }, [resinfo1]);
  console.log(resinfo1);
  useEffect(() => {
    if (resinfo && resinfo["game_rates"]) {
      setStatus(true);
      setGameRates(resinfo["game_rates"][0]);
    }
  }, [resinfo]);

  return (
    <>
      <div className="px-2">
        <div className="font-bold flex items-center justify-center text-lg mt-2 underline">
          <h3>GALI DISAWAR</h3>
        </div>
        <div>
          <div style={backStyle}>
            <div className="w-120">
              <div className="flex items-center justify-center pt-2 mb-2">
                <div
                  onClick={() => navigate("/impbid")}
                  className="w-1/3 mr-2 bg-my-gradient border-1 text-white  rounded-xl border-yellow-600 flex items-center justify-center  z-4 hover:shadow-lg shadow-md"
                >
                  <button className="flex flex-col py-2 px-1 items-center justify-center">
                    <p className="font-bold">Bid-History</p>{" "}
                    <FaHistory className="text-2xl" />
                  </button>{" "}
                </div>
                <div
                  onClick={() => navigate("/impwin")}
                  className="w-1/3 mr-2 bg-my-gradient border-1 text-white  rounded-xl border-yellow-600 flex items-center justify-center  z-4 hover:shadow-lg shadow-md"
                >
                  {" "}
                  <button className="flex flex-col py-2 px-1 items-center justify-center">
                    <p className="font-bold">Win History</p>{" "}
                    <FaHistory className="text-2xl" />
                  </button>{" "}
                </div>
                <div
                  onClick={handleClick}
                  className="w-1/3 mr-2 bg-my-gradient border-1 text-white  rounded-xl border-yellow-600 flex items-center justify-center  z-4 hover:shadow-lg shadow-md"
                >
                  {" "}
                  <button className="flex flex-col py-2 px-1 items-center justify-center">
                    <p className="font-bold">Chart</p>{" "}
                    <FaChartSimple className="text-2xl" />
                  </button>{" "}
                </div>
              </div>
              {/* <div className="flex " style={box1}>
                <button
                  className="text-white rounded border border-white  "
                  style={btnStyle}
                  onClick={() => navigate("/impbid")}
                >
                  Bid History
                </button>
                <button
                  className="text-white rounded border border-white  "
                  style={btnStyle}
                  onClick={() => navigate("/impwin")}
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
              {/* <div className=""> */}
              <div className="flex flex-col justify-center w-100 mx-auto text-white bg-my-gradient border rounded-2 font-bold z-4 shadow-md p-2 rounded-lg px-10">
                <div className="flex  justify-between items-center">
                  <p>Left Digit</p>
                  <p className="ml-1">:-</p>
                  <p>
                    {gameRates["single_digit_val_1"]}-
                    {gameRates["single_digit_val_2"]}
                  </p>
                </div>

                <div className="flex  justify-between items-center ">
                  <p> Right Digit</p>
                  <p className="">:-</p>
                  <p>
                    {gameRates["single_pana_val_1"]}-
                    {gameRates["single_pana_val_2"]}
                  </p>
                </div>

                <div className="flex justify-between items-center">
                  <p>Jodi Digit </p>
                  <p className="ml-4">:-</p>
                  <p>
                    {gameRates["double_pana_val_1"]}-
                    {gameRates["double_pana_val_2"]}
                  </p>
                </div>
              </div>
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default GALIRATES;
