import topBackground from "./Images/bg.png";
import chart from "./assets/ICONS AND BACKGROUNDS/charts.png";
import close from './assets/ICONS AND BACKGROUNDS/closed.png';
import open from "./assets/ICONS AND BACKGROUNDS/play now.png";
import { useEffect, useState } from "react";
import useGameFront from "./Hooks/useGameFront";
import { useSelector } from "react-redux";
import { useNavigate,useLocation} from "react-router-dom";
import running from "./assets/ICONS AND BACKGROUNDS/35.0.png";
import closed from "./assets/ICONS AND BACKGROUNDS/36.0.png";

function GameFRONT() {
  const [status, setStatus] = useState(false);
  const [gameRates, setGameRates] = useState([{}]);
  const unique = useSelector((state) => state.userDetail.token);

  const resinfo = useGameFront(unique);

  useEffect(() => {
    if (resinfo && resinfo["result"]) {
      setStatus(true);
      setGameRates(resinfo["result"]);
    }
  }, [resinfo]);

  const navigate = useNavigate();
  const location=useLocation();
  
  return (
    <div className="px-5 mt-7">
      {gameRates.map((game, index) => (
        <div
          key={index}
          className="mb-8 border-[1.5px] shadow-md border-[#203424] rounded matkagame flex flex-col relative"
        >
          {/* Overlapping Image with Text */}
          <div className="relative">
            <div className="absolute top-[-20px] right-[5px] w-[180px] h-[30px] flex items-center justify-center bg-white">
              {/* PNG Image */}
              <img
                src={game.msg_status === 1 ? running : closed}
                alt="Game Status"
                className="w-full h-full"
              />
              {/* Text Overlay */}
              <p className={`absolute font-bold text-xs ${game.msg_status === 1 ? "text-green-500" : "text-red-500"}`}>
                {game.msg_status === 1 ? "BETTING IS RUNNING" : "BETTING IS CLOSED"}
              </p>
            </div>
          </div>

          {/* Main Flex Container (flex-col with A and B) */}
          <div className="flex flex-col h-full">
            {/* A: Main game details (90% height) */}
            <div className="flex flex-row h-[90%]">
              {/* First Section: Game Details (40% Width) */}
              <div className="w-[40%] flex items-center justify-center">
                <div className="flex flex-col items-center">
                  <p className="font-bold text-xs md:text-xl lg:text-2xl">{game.game_name}</p>
                  <p className="font-bold text-black text-sm">{game.open_result
                    ? game.close_result
                      ? `${game.open_result}${game.close_result}`
                      : `${game.open_result}****`
                    : "***_**_***"}</p>
                </div>
              </div>

              {/* Second Section: Charts Button (20% Width) */}
              <div className="w-[20%] flex flex-col items-center justify-center">
                <a href={game.web_chart_url} target="_blank" rel="noopener noreferrer">
                  <button className="flex items-center">
                    <img src={chart} alt="Chart" className="w-[60px] h-auto" />
                  </button>
                </a>
            </div>

    {/* Third Section: Play Button (40% Width) */}
        <div className="flex flex-col items-center justify-center">
          <button
            className="pt-4 ml-5"
            onClick={() => {
              if (game.msg_status===1 && location.pathname=="/imp") {
                navigate("/game", {
                  state: {
                    gameId: game.game_id,
                    openTime: game.open_time,
                    gameName: game.game_name,
                  },
                });
              }
            }}
            
          >
            <img
              src={game.msg_status === 1 ? open : close}
              className="block ml-4 h-[33px] cursor-pointer"
              alt="Game Button"            
            />
          </button>
        </div>
     </div>

            {/* B: Open/Close time container (10% height, justify-between) */}
            <div className="flex flex-row h-[10%] justify-between items-center px-5 border rounded-full bg-my-gradient-2 border-b-[1.5px] border-[#203424]">
              <p className="text-green-700 font-bold text-xs md:text-lg">Open - {game.open_time}</p>
              <p className="text-red-700 font-bold text-xs md:text-lg">Close - {game.close_time}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default GameFRONT;
