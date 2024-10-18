import { BiArrowBack } from "react-icons/bi";
import right from "./assets/ICONS AND BACKGROUNDS/RIGHT DIGIT.png"; 
import left from "./assets/ICONS AND BACKGROUNDS/LEFT DIGIT.png"; 
import jodi from "./assets/ICONS AND BACKGROUNDS/JODI DIGIT.png"; 
import topBackground from "./Images/bg.png";
import { useNavigate, useLocation } from "react-router-dom";
import { FaAnglesLeft } from "react-icons/fa6";
import { FaAnglesRight } from "react-icons/fa6";
import { GiRollingDices } from "react-icons/gi";

function GaliAllGame() {
  const navbarStyle = {
    height: "60px",
    display: "flex",
    alignItems: "center",
    position: "relative",
  };
  const cardStyle = {
    width: "400px",
  };

  const backStyle = {
    background: 'white',
    backgroundSize: "cover",
  };
  const imgStyle = {
    width: "130px", // Set the new width
    height: "130px", // Set the new height
    borderRadius: "10px", // Slight rounding for a smooth look
    boxShadow: "0 0 5px rgba(0, 255, 0, 0.7)",
  };
  const navigate = useNavigate();
  const back = () => {
    navigate(-1);
  };
  const { gameId, openTime, gameName } = useLocation().state;

  console.log(gameId);

  return (
    <>
      <div
        className="pl-2 flex-col justify-center items-start h-svh"
        style={backStyle}
      >
        <div className="flex justify-center items-center mt-10">
          <div className="shadow-md border rounded-xl col-span-1 text-white bg-my-gradient flex justify-center items-center mt-4 text-lg font-bold mr-20 w-32 h-32"
            style={imgStyle}>
            <button
              onClick={() => {
                if (gameId) {
                  console.log(gameId);
                  navigate("/leftdigit", { state: { gameId: gameId, openTime: openTime, gameName: gameName, pana: 'Single Pana' } });
                }
              }}>
              <img src={left} alt="Left Digit" className="w-[120px] h-[110px]" />
            </button>
          </div>
          <div className="shadow-md border rounded-xl col-span-1 text-white bg-my-gradient flex justify-center items-center mt-4 text-lg font-bold"
            style={imgStyle}>
            <button
              onClick={() => {
                if (gameId) {
                  console.log(gameId);
                  navigate("/rightdigit", { state: { gameId: gameId, openTime: openTime, gameName: gameName, pana: 'Right Digit' } });
                }
              }}>
              <img src={right} alt="Right Digit" className="w-[120px] h-[110px]" />
            </button>
          </div>
        </div>

        {/* Third row with one column */}
        <div className="flex justify-center items-center">
          <div className="shadow-md border rounded-xl col-span-2 text-white bg-my-gradient w-32 h-32 flex justify-center items-center mt-7 text-lg font-bold ml-25"
            style={imgStyle}>
            <button
              onClick={() => {
                if (gameId) {
                  console.log(gameId);
                  navigate("/jodidigit", { state: { gameId: gameId, openTime: openTime, gameName: gameName, pana: 'Triple Pana' } });
                }
              }}>
              <img src={jodi} alt="Jodi Digit" className="w-[120px] h-[110px]" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default GaliAllGame;
