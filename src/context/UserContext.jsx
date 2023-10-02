import { GoogleOAuthProvider } from "@react-oauth/google";
import { createContext, useContext, useEffect, useState } from "react";
import { useGetUserQuery } from "../service/user";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const { data, isLoading } = useGetUserQuery();

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <UserContext.Provider value={{ user: data?.user, loading: isLoading }}>
        {children}
      </UserContext.Provider>
    </GoogleOAuthProvider>
  );
};

export const useUserContext = () => {
  const { user, loading } = useContext(UserContext);

  return { user, loading };
};
