import { BiArrowBack } from "react-icons/bi";
import SingleDigit from './assets/ICONS AND BACKGROUNDS/SINGLE DIGIT.png';
import JodiDigit from './assets/ICONS AND BACKGROUNDS/JODI DIGIT.png'; // Add this if needed
import SinglePanna from './assets/ICONS AND BACKGROUNDS/SINGLE PANNA.png';
import DoublePanna from './assets/ICONS AND BACKGROUNDS/DOUBLE PANNA.png';
import TriplePanna from './assets/ICONS AND BACKGROUNDS/TRIPLE PANNA.png';
import HalfSangam from './assets/ICONS AND BACKGROUNDS/HALF SANGAM.png'; // Add this if needed
import FullSangam from './assets/ICONS AND BACKGROUNDS/FULL SANGAM.png'; // Add this if needed
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";

function StarGame() {
  const navbarStyle = {
    height: "60px",
    display: "flex",
    alignItems: "center",
    position: "relative",
  };

  const cardStyle = {
    width: "300px",
    padding: "0px",
  };

  const backStyle = {
    background: 'white',
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  const imgStyle = {
    width: "120px", // Set the new width
    height: "115px", // Set the new height
    borderRadius: "10px", // Slight rounding for a smooth look
    boxShadow: "0 0 5px rgba(0, 255, 0, 0.7)",
  };

  const navigate = useNavigate();
  const { gameId, openTime, gameName } = useLocation().state;

  return (
    <>
      <div className="pl-2 flex justify-center" style={backStyle}>
        <div className="grid grid-cols-2 gap-2 mt-10 font-bold" style={cardStyle}>
          <div className="flex justify-center items-center rounded-xl">
            <button
              onClick={() => {
                if (gameId) {
                  navigate("/StarSingle", { state: { gameId, openTime, gameName, pana: 'Single Digit' } });
                }
              }}>
              <img src={SingleDigit} style={imgStyle} className="rounded-xl" />
            </button>
          </div>
          <div className="flex justify-center items-center rounded-xl">
            <button
              onClick={() => {
                if (gameId) {
                  navigate("/Ssinglepana", { state: { gameId, openTime, gameName, pana: 'Single Pana' } });
                }
              }}>
              <img src={SinglePanna} style={imgStyle} className="rounded-xl" />
            </button>
          </div>
          <div className="flex justify-center items-center rounded-xl">
            <button
              onClick={() => {
                if (gameId) {
                  navigate("/Sdoublepana", { state: { gameId, openTime, gameName, pana: 'Double Pana' } });
                }
              }}>
              <img src={DoublePanna} style={imgStyle} className="rounded-xl" />
            </button>
          </div>
          <div className="flex justify-center items-center rounded-xl">
            <button
              onClick={() => {
                if (gameId) {
                  navigate("/Stripplepana", { state: { gameId, openTime, gameName, pana: 'Triple Pana' } });
                }
              }}>
              <img src={TriplePanna} style={imgStyle} className="rounded-xl" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default StarGame;
