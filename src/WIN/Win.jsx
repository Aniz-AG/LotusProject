import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import DatePickerButton from "../Date";

function Win({ onDataFetch }) {
  const navigate = useNavigate();
  const token = useSelector((state) => state.userDetail.token);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(new Date());
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchData(changedate(selectedDate), changedate(selectedEndDate));
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
  };

  const handleSubmit = async () => {
    if (isSubmitting) return; // Prevent duplicate submissions

    setIsSubmitting(true);
    const startdate1 = changedate(selectedDate);
    const enddate1 = changedate(selectedEndDate);
    try {
      await fetchData(startdate1, enddate1);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const fetchData = async (startdate1, enddate1) => {
    const response = await fetch(
      "https://lotus365matka.in/api-wining-history-data",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Cookie": "ci_session=7c38fc1fc455fca9846d688fb8343f5c7ea71bee",
        },
        body: JSON.stringify({
          env_type: "Prod",
          app_key: "jAFaRUulipsumXLLSLPFytYvUUsgfh",
          unique_token: token,
          date_from: startdate1,
          date_to: enddate1,
        }),
      }
    );
    const result = await response.json();
    if (result?.status === true) onDataFetch(true, result);
    else onDataFetch(false, null);
  };

  const changedate = (selectedDate) => {
    if (!selectedDate) return "";
    return `${selectedDate.getMonth() + 1}/${selectedDate.getDate()}/${selectedDate.getFullYear()}`;
  };

  return (
    <div className="shadow-md p-4 bg-transparent">
      <h1 className="font-bold text-lg text-center mb-4 text-white">WIN HISTORY</h1>
      <div className="flex justify-center bg-my">
        <form className="shadow-md rounded-lg bg-transparent w-[90vw]">
          <p className="font-bold ml-2 text-sm text-white">From Date</p>
          <DatePickerButton 
            selectedDate={selectedDate} 
            onDateChange={handleDateChange} 
            className="w-full rounded-full text-white"
          />
          <p className="mt-4 ml-2 font-bold text-sm text-white">To Date</p>
          <DatePickerButton 
            selectedDate={selectedEndDate} 
            onDateChange={handleEndDateChange} 
            className="w-full rounded-full text-white"
          />
          <div className="flex justify-center">
            <button
              className="p-2 mt-4 border rounded w-full bg-yellow-600 hover:bg-yellow-500 transition duration-200 ease-in-out text-white"
              onClick={handleSubmit}
              disabled={isSubmitting} // Disable button when submitting
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Win;
