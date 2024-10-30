import "../Modal.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const StarModal = ({
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
  const [isSubmitting, setIsSubmitting] = useState(false);
console.log("Pana:",pana)
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
    if (!isSubmitting) {
      setIsSubmitting(true);
    try {
      const res=await fetchData(token,gameId,submittedData,gameName,pana,totalPoints,date);
      console.log("Response:",res);
      notify();
      closeModal(); // Close the modal here
      clearSubmittedData()
    } catch (error) {
          console.log(`ERROR:${error}`);
    }
    finally {
      setIsSubmitting(false); // Reset submitting state to false
    }
  }
  };

  const fetchData = async (token, gameId, submittedData, gameName, pana, totalPoints, date) => {
    console.log("Submitted data in StarModal:",submittedData);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
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
        session: "Open",
        result: submittedData, //submitted data contains points, digits 
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
        "https://lotus365matka.in/api-starline-submit-bid",
        requestOptions
      );
      if (!response.ok) {
        // Log the status code and the status text for debugging
        console.error("HTTP Error:", response.status, response.statusText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      console.log("Response result:", result);
      if (result?.status === true) {
        // Handle success
        return result;
      } else {
        // Handle invalid status in the API response
        console.error("API Error:", result.message || "Unknown error");
        throw new Error(result.message || "Invalid username and password");
      }
    } catch (error) {
      console.error("Fetch Error:", error.message);
      throw error;
    }
  };


  return (
    <>
      <div className="modal-wrapper rounded" onClick={closeModal}></div>
      <div className="modal-container text-black flex flex-col rounded-tr-xl rounded-br-xl rounded-bl-none rounded-tl-xl font-bold py-4 px-2">
        <p>Once you placed a bid, it will not be cancelled</p>
        <p className="text-center">in any situation</p>
        <p className="text-center mb-2 py-2 text-white rounded-xl bg-yellow-600">
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
            <p className="text-center">-</p>
          </div>
        </div>
        <div className="flex justify-around mt-2 text-white">
          <button
            onClick={closeModal}
            className="model-btn p-4 bg-yellow-600 rounded-xl border border-white"  style={{boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)"}}
          >
            CANCEL
          </button>
          <form onSubmit={handleSubmit}>
            <button type="submit" className="bg-yellow-600 rounded-xl p-4 border border-white"  style={{boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)"}}>
            {isSubmitting ? "Submitting..." : "SUBMIT"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default StarModal;
