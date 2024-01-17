import React, { useState } from "react";
import "../style.css";
import SignUp from "../components/Signup";
import Login from "../components/Login";
const HomePage = () => {
  const [activeTab, setActiveTab] = useState("Login");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  return (
    <div>
      <Login />
    </div>
  );
};

export default HomePage;
