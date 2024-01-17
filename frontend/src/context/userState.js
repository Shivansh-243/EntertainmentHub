import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const tokenInfo = localStorage.getItem("token");
    // console.log("tt", tokenInfo);
    setToken(tokenInfo);
    if (!tokenInfo) navigate("/");
  }, [navigate]);
  return <UserContext.Provider value={token}>{children}</UserContext.Provider>;
};

export const UserState = () => {
  return useContext(UserContext);
};
export default UserProvider;
