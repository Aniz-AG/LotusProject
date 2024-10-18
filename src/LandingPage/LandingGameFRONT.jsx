import React from "react";
import { FaPlay } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function LandingGameFRONT() {
  const centerstyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "-4px",
  };
  const laststyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "7px",
    gap: "7px",
  };
  const imgstyle = {
    width: "40px",
    height: "auto",
    marginTop: "-4px",
  };
  const navigate = useNavigate();

  const games = [
    "Kalyan Morning",
    "Madhur Morning",
    "Sridevi",
    "Time Bazar",
    "Madhur Day",
    "Milan Day",
    "Rajdhani Day",
    "Supreme Day",
    "Kalyan",
    "Sridevi Night",
    "Madhur Night",
    "Supreme Night",
    "Milan Night",
    "Kalyan Night",
    "Rajdhani Night",
    "Main Bazar",
  ];

  return (
    <div className="px-5 mt-2">
      {games.map((game, index) => (
        <div key={index} className="mb-5 border shadow-md rounded py-2">
          <div className="flex items-center justify-evenly">
            <div>
              <p className="text-black font-bold">***_**_***</p>
            </div>
            <div className="flex flex-col justify-center items-center text-sm">
              <div className="flex flex-col items-center justify-center font-bold text-sm">
                <p className=" text-[#396c39]">{game}</p>
              <div className="text-[#396c39] font-bold">Login To Play</div>
              </div>
            </div>
            <div>
              <button onClick={()=> navigate("/login")}>
                <FaPlay className="text-2xl text-[#396c39]" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default LandingGameFRONT;
