import { useQuery } from "react-query"
import { getAxios } from "./axios";

export const useGetUserQuery = () => {
    return useQuery({
        queryKey: ["useGetUserQuery"],
        queryFn: async () => {
            const { data } = await getAxios().get("/auth/login/success");

            return data;
        }
    })
}