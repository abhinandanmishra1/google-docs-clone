import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const {data} = await axios.get("http://localhost:5000/auth/login/success", {
        withCredentials: true,
      });
      
      setUser(data.user);
    }
    getUser();
  }, []);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};

export const useUserContext = () => {
  const { user } = useContext(UserContext);

  return user;
};
