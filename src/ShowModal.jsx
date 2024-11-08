import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
const MyModal = ({
  closeModal,
  totalIndex,
  totalPoints,
  submittedData,
  gameId,
  gameName,
  pana,
  gametype,
  date,
  clearSubmittedData,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false); // State to track form submission

  const navigate = useNavigate();
  const notify = () => {
    toast("Bid Successfully Placed");
  };

  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);

  const token = useSelector((state) => state.userDetail.token);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isSubmitting) { // Check if form is already being submitted
      setIsSubmitting(true); // Set submitting state to true
      try {
        await fetchData(
          token,
          gameId,
          submittedData,
          gameName,
          pana,
          gametype,
          totalPoints,
          date
        );
        notify();
        closeModal();
        clearSubmittedData();
      } catch (error) {
        console.log(error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };
//FETCH DATA FUNCTION
const fetchData = async (
  token,
  gameId,
  submittedData,
  gameName,
  pana,
  gametype,
  totalPoints,
  date
) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Cookie", "ci_session=7c38fc1fc455fca9846d688fb8343f5c7ea71bee");

  console.log("Submitted data in Modal:", submittedData);
  console.log("Pana in Modal:", pana);
  console.log("GameType in Modal:", gametype);

  let requests = [];

  if (pana === "SP DP TP") {
    // Group all session data for SP, DP, TP into their respective result arrays
    let spResult = [];
    let dpResult = [];
    let tpResult = [];

    // Process all submitted data
    submittedData.forEach((data) => {
      // For Single Pana (SP)
      if (data.combinations.SP.length > 0) {
        data.combinations.SP.forEach((sp) => {
          spResult.push({
            digits: sp,
            closedigits: "", // Assuming you leave closedigits empty for SP
            points: data.points,
            session: gametype, // Use gametype "Open" or "Close"
          });
        });
      }

      // For Double Pana (DP)
      if (data.combinations.DP.length > 0) {
        data.combinations.DP.forEach((dp) => {
          dpResult.push({
            digits: dp,
            closedigits: "", // Assuming you leave closedigits empty for DP
            points: data.points,
            session: gametype, // Use gametype "Open" or "Close"
          });
        });
      }

      // For Triple Pana (TP)
      if (data.combinations.TP.length > 0) {
        data.combinations.TP.forEach((tp) => {
          tpResult.push({
            digits: tp,
            closedigits: "", // Assuming you leave closedigits empty for TP
            points: data.points,
            session: gametype, // Use gametype "Open" or "Close"
          });
        });
      }
    });

    // Prepare a request for each Pana type with all corresponding result data
    if (spResult.length > 0) {
      const spRequest = {
        env_type: "Prod",
        app_key: "jAFaRUulipsumXLLSLPFytYvUUsgfh",
        unique_token: token,
        game_id: gameId,
        new_result: {
          unique_token: token,
          Gamename: gameName,
          totalbit: totalPoints,
          gameid: gameId,
          pana: "Single Pana",
          bid_date: date,
          session: gametype, // This should match the game session type
          result: spResult, // All SP result data
        },
      };
      console.log("Single Pana Request Body:", JSON.stringify(spRequest, null, 2)); // Log for SP
      requests.push(sendRequest(token, gameId, spResult, gameName, totalPoints, date,"Single Pana", gametype));
    }

    if (dpResult.length > 0) {
      const dpRequest = {
        env_type: "Prod",
        app_key: "jAFaRUulipsumXLLSLPFytYvUUsgfh",
        unique_token: token,
        game_id: gameId,
        new_result: {
          unique_token: token,
          Gamename: gameName,
          totalbit: totalPoints,
          gameid: gameId,
          pana: "Double Pana",
          bid_date: date,
          session: gametype, // This should match the game session type
          result: dpResult, // All DP result data
        },
      };
      console.log("Double Pana Request Body:", JSON.stringify(dpRequest, null, 2)); // Log for DP
      requests.push(sendRequest(token, gameId, dpResult, gameName, totalPoints, date,"Double Pana", gametype));
    }

    if (tpResult.length > 0) {
      // const tpRequest = {
      //   // env_type: "Prod",
      //   // app_key: "jAFaRUulipsumXLLSLPFytYvUUsgfh",
      //   // unique_token: token,
      //   // game_id: gameId,
      //   new_result: {
      //     unique_token: token,
      //     Gamename: gameName,
      //     totalbit: totalPoints,
      //     gameid: gameId,
      //     pana: "Triple Pana",
      //     bid_date: date,
      //     session: gametype, // This should match the game session type
      //     result: tpResult, // All TP result data
      //   },
      // };
      //console.log("Triple Pana Request Body:", JSON.stringify(tpRequest, null, 2)); // Log for TP
      requests.push(sendRequest(token, gameId, tpResult, gameName, totalPoints, date, "Triple Pana", gametype));
    }

    // Wait for all requests to complete
    await Promise.all(requests);
  } else {
    // Handle other cases (like Half Sangam, etc.)
    const sessionData = submittedData.map((data) => {
      let closedigits = "";
      let digits = "";
      let closePana = "";
      let panaValue = "";

      if (pana === "Half Sangam") {
        console.log("I am in Half Sangam");
        if (gametype === "Open") {
          digits = data.digits; // Use open digit
          closedigits = data.closedigits;
          closePana = pana; // Send close pana
        }
      } else {
        if (gametype === "Close") {
          closedigits = data.digits; // Use close digit
          closePana = pana; // Send close pana
        } else if (gametype === "Open") {
          digits = data.digits; // Use open digit
          panaValue = pana; // Send open pana
        }
      }

      return {
        closedigits: closedigits,
        digits: digits,
        points: data.points,
        session: gametype,
        pana: panaValue,
        closepana: closePana,
      };
    });

    const requestBody = {
      env_type: "Prod",
      app_key: "jAFaRUulipsumXLLSLPFytYvUUsgfh",
      unique_token: token,
      game_id: gameId,
      new_result: {
        unique_token: token,
        Gamename: gameName,
        totalbit: totalPoints,
        gameid: gameId,
        pana: pana,
        gametype: gametype,
        bid_date: date,
        session: pana,
        result: gametype==="Open"?sessionData:submittedData,
      },
    };

    console.log("Final Request Body for Other Cases:", JSON.stringify(requestBody, null, 2));

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(requestBody),
      redirect: "follow",
    };

    const response = await fetch("https://lotus365matka.in/api-submit-bid", requestOptions);
    const result = await response.json();
    console.log("API Response:", result);

    if (result?.status !== true) {
      throw new Error("Invalid username and password");
    }
  }
};


  
  const sendRequest = async (token, gameId, sessionData, gameName, totalPoints, date, pana, gametype) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", "ci_session=7c38fc1fc455fca9846d688fb8343f5c7ea71bee");
  
    const raw = JSON.stringify({
      env_type: "Prod",
      app_key: "jAFaRUulipsumXLLSLPFytYvUUsgfh",
      unique_token: token,
      game_id: gameId,
      new_result: {
        unique_token: token,
        Gamename: gameName,
        totalbit: totalPoints,
        gameid: gameId,
        pana: pana,
        gametype: gametype,
        bid_date: date,
        session: pana,
        result: Array.isArray(sessionData) ? sessionData : [sessionData],
      },
    });
  
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
  
    try {
      const response = await fetch(
        "https://lotus365matka.in/api-submit-bid",
        requestOptions
      );
  
      const result = await response.json();
  
      if (result?.status !== true) {
        console.error("Error in response:", result);
        throw new Error("Request failed");
      }
    } catch (error) {
      console.error("Request Error:", error);
      throw new Error("Request failed");
    }
  };
  
  return (
    <>
      <div className="modal-wrapper rounded" onClick={closeModal}></div>
      <div className="modal-container text-black flex flex-col rounded-tr-xl rounded-br-xl rounded-bl-none rounded-tl-xl font-bold py-4 px-2">
        <p>Once you placed a bid, it will not be cancelled</p>
        <p className="text-center">in any situation</p>
        <p className="text-center mb-2 py-2 text-white rounded-xl bg-yellow-600" > 
          {pana}
        </p>
        <div className="flex justify-between align-middle bg-gray-800 text-white mb-2 py-2 px-2">
          <div className="flex flex-col">
            <p>Total Bid</p>
            <p className="text-center">{totalIndex}</p>
          </div>
          <div className="flex flex-col">
            <p>Total Point</p>
            <p className="text-center">{totalPoints}</p>
          </div>
          <div className="flex flex-col">
            <p>Game Type</p>
            <p className="text-center">{gametype}</p>
          </div>
        </div>
        <div className="flex justify-around mt-2 text-white">
          <button
            onClick={closeModal}
            className="model-btn p-4  rounded-xl border border-white bg-yellow-600" style={{boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)"}}
          >
            CANCEL
          </button>
          <form onSubmit={handleSubmit}>
            <button
              type="submit"
              disabled={isSubmitting}
              className=" rounded-xl p-4 bg-yellow-600 border border-white" style={{boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)"}}
            >
              {isSubmitting ? "Submitting..." : "SUBMIT"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default MyModal;