import { useState, useEffect } from "react";

function useQRPAY() {
  const [res, setRes] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append(
        "Cookie",
        "ci_session=7c38fc1fc455fca9846d688fb8343f5c7ea71bee"
      );

      const raw = JSON.stringify({

      env_type: "Prod",
      app_key: "jAFaRUulipsumXLLSLPFytYvUUsgfh",
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const response = await fetch(
        "https://lotus365matka.in/api-get-qr-pay",
        requestOptions
      );
      const result = await response.json();

      // Update state with the fetched data
      setRes(result);
    //   console.log(result);
    } catch (error) {
      console.log('error', error);
    }
  };

  return res;
}

export default useQRPAY;
