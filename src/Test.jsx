import React, { useState } from 'react';

function Test() {
  const [isSubmit, setIsSubmit] = useState(false);
  const [errorText, setErrorText] = useState('');

  const handleSubmit = async () => {
    try {
      await fetchData();
      setIsSubmit(true);
    } catch (error) {
      setErrorText("Username or password incorrect"); // Set error message
    }
  };

  const fetchData = async () => {
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
      "https://lotus365matka.in/api-get-social-data",
      requestOptions
    );
    const result = await response.json();
    console.log(result);

    if (result?.status === true) {
      // Handle successful response
    } else {
      throw new Error("Invalid username and password");
    }
  };

  return (
    <>
      <div>
        <button
          className="p-3 border border-black-500 rounded mt-4 bg-yellow-600 hover:bg-yellow w-3/4 text-white"
          type="button" // specify type as button to prevent form submission
          onClick={handleSubmit} // call handleSubmit when the button is clicked
        >
          Submit
        </button>
      </div>
    </>
  );
}

export default Test;
