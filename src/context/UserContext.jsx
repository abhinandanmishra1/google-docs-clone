import { GoogleOAuthProvider } from "@react-oauth/google";
import { createContext, useContext, useEffect, useState } from "react";
import { getAxios } from "../service";
import { useNavigate } from "react-router-dom";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await getAxios().get(
          `${import.meta.env.VITE_DOCS_SERVER_BASE_URL}/auth/login/success`
        );

        setUser(data.user);
        console.log(data.user);
        navigate("");
      } catch (err) {
        setUser(null);
        // alert(err.message);
      }
    };
    getUser();
  }, []);

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
    </GoogleOAuthProvider>
  );
};

export const useUserContext = () => {
  const { user } = useContext(UserContext);

  return user;
};
