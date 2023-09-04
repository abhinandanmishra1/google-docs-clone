import { GoogleOAuthProvider } from "@react-oauth/google";
import { createContext, useContext, useEffect, useState } from "react";
import { getAxios } from "../service";

const UserContext = createContext(null);

console.log(import.meta.env.VITE_GOOGLE_CLIENT_ID);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await getAxios().get(
        `${import.meta.env.VITE_DOCS_SERVER_BASE_URL}/auth/login/success`
      );

      setUser(data.user);
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
