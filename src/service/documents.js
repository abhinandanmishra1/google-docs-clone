import { useQuery } from "react-query";
import { getAxios } from ".";

export const useGetDocumentsQuery = () => {
  return useQuery({
    queryKey: ["useGetDocumentsQuery"],
    queryFn: async () => {
      const { data } = await getAxios().get("/documents", {
        withCredentials: true,
      });
      return data;
    },
    cacheTime: 0,
  });
};
