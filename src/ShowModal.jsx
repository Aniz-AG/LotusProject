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
          totalPoints,
          date
        );
        notify();
        closeModal();
        clearSubmittedData();
      } catch (error) {
        console.log(error);
      } finally {
        setIsSubmitting(false); // Reset submitting state to false
      }
    }
  };

  const fetchData = async (
    token,
    gameId,
    submittedData,
    gameName,
    pana,
    totalPoints,
    date
  ) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Cookie",
      "ci_session=7c38fc1fc455fca9846d688fb8343f5c7ea71bee"
    );

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
        bid_date: date,
        session: "Close",
        result: submittedData,
      },
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const response = await fetch(
      "https://lotus365matka.in/api-submit-bid",
      requestOptions
    );
    const result = await response.json();
    if (result?.status === true) {

      // notify();
    } else {
      throw new Error("Invalid username and password");
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
            <p className="text-center">Close</p>
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
