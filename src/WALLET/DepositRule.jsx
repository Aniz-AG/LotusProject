import useRule from "../Hooks/useRule";
import topBackground from "../Images/bg.png";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function DepositRule(){

    
      const navbarStyle = {
        height: "60px",
        display: "flex",
        alignItems: "center",
        position: "relative",
      };
      const navigate = useNavigate();

      const [status, setStatus] = useState(false);
      const [gameRates, setGameRates] = useState([]);
      const resinfo = useRule();
      
      useEffect(() => {
        if (resinfo && resinfo["content"]) {
          setStatus(true);
          setGameRates(resinfo["content"]);
        } else {
          setStatus(false);
          setGameRates([]);
        }
      }, [resinfo]);

    return (
        <>
      <div  className="mt-2">
        <div className="text-black font-bold px-3 ">
          {status && gameRates.length > 0 && gameRates[0].deposit_rule.split('\n').map((line, index) => (
            <p className="mb-4"key={index}>{line}</p>
          ))}
        </div>
      </div>
      </>
    );
}

export default DepositRule;
