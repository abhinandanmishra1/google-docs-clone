import { useCallback, useEffect } from "react";
import { getAxios } from "../service";

export const useRefreshToken = () => {
    const authToken = localStorage.getItem("authToken");
  const refreshToken = localStorage.getItem("refreshToken");

  const refreshAuth = useCallback(async () => {
    if (!authToken) return;
    try {
      const tokens = await getAxios().post("/auth/google/refresh-token", {
        refreshToken,
      });

      localStorage.setItem("authToken", tokens.data.access_token);

      const { id_token, refresh_token } = tokens.data;

      await getAxios().post("/users", {
        refreshToken: refresh_token,
        idToken: id_token,
      });
    } catch (err) {
      console.log("error in refreshing the token", err);
    }
  }, []);

  const ONE_HOUR = 55 * 60 * 100;

  useEffect(() => {
    refreshAuth(); // call as soon as component is loaded

    const interval = setInterval(refreshAuth, ONE_HOUR);

    return () => {
      clearInterval(interval);
    };
  }, [refreshAuth]);
}