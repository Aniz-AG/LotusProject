import React, { useState, useEffect } from "react";

const TimerStar = ({ closeTime }) => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const calculateTimeLeft = () => {
    const totalTime = closeTime * 1000 - Date.now();

    if (totalTime <= 0) {
      // Stop the timer if the time has run out
      setDays(0);
      setHours(0);
      setMinutes(0);
      setSeconds(0);
      return true; // Indicate that the timer should stop
    }

    setDays(Math.floor(totalTime / (1000 * 60 * 60 * 24)));
    setHours(Math.floor((totalTime / (1000 * 60 * 60)) % 24));
    setMinutes(Math.floor((totalTime / (1000 * 60)) % 60));
    setSeconds(Math.floor((totalTime / 1000) % 60));
    return false; // Indicate that the timer should continue
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (calculateTimeLeft()) {
        clearInterval(timer); // Clear interval if time has run out
      }
    }, 1000);

    return () => clearInterval(timer); // Cleanup timer on component unmount
  }, []);

  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
  };

  return (
    <span>
      {`${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`}
    </span>
  );
};

export default TimerStar;
