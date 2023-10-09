import { useQuery } from "react-query";
import { getAxios } from "./axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useGetUserQuery = () => {
  const authToken = localStorage.getItem("authToken");
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!authToken) return;
    setLoading(true);
    async function fetchUser() {
      try {
        const { data } = await getAxios().get("/auth/login/success");

        setData(data);
      } catch (err) {
        setError(err);
        navigate("/signin");
      }
    }

    fetchUser();
    setLoading(false);
  }, [navigate]);

  return {
    data,
    isLoading,
    error,
    setData
  }
};
