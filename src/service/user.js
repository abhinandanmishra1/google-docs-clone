import { useQuery } from "react-query"
import { getAxios } from "./axios";

export const useGetUserQuery = () => {
    const authToken = localStorage.getItem("authToken");
    return useQuery({
        queryKey: ["useGetUserQuery"],
        queryFn: async () => {
            const { data } = await getAxios().get("/auth/login/success");

            return data;
        },
        enabled: !!authToken
    })
}