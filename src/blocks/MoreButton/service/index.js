import { useMutation } from "react-query";
import { getAxios, queryClient } from "../../../service";

export const useDeleteDocumentMutation = () => {
  return useMutation({
    mutationFn: async (id) => {
      await getAxios().delete(`/documents/${id}`);
    },
    onSuccess: () => {
      queryClient.refetchQueries(["useGetDocumentsQuery"]);
      // Todo: add notification
    },
    onError: () => {
      // Todo: add notification
    },
  });
};
