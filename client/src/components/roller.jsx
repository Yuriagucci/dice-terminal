import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";


// Main Terminal Component
const Roller = () => {
  // This will be used to redirect the user if they are not logged in
  const navigate = useNavigate();
   // useEffect is a React hook that runs side effects in a component
  // In this case, it will run only when the component is first loaded (mounted)
  useEffect(() => {
    // Retrieve stored login/session information from localStorage
    const token = localStorage.getItem("diceToken"); // The flag indicating the user is logged in
    const userId = localStorage.getItem("userId");   // The unique ID of the logged-in user
    const name = localStorage.getItem("name");       // The name of the logged-in user
    // If either the token or userId is missing, it means the user is NOT logged in
    if (!token || !userId) {
      navigate("/"); // Redirect the user to the login page
      return; // Stop executing the rest of the code in this effect
    }
    console.log(`Welcome, ${name}.`); // If login information is found, greet the user in the console
  }, [navigate]); // The dependency array [navigate] means:
                  // - This effect will run once when the component is first loaded
                  // - And again ONLY if the navigate function changes (rare in practice)
  return ( // What the component will display on the page
    <div>
      {/* The title for the page */}
      <h1>Dice Roller</h1>
      {/* A welcome message that shows the user's name from localStorage */}
      <p>Welcome, {localStorage.getItem("name")}!</p>
      {/* Here is where your dice rolling interface code would go */}
    </div>
  );
};

export default Roller;