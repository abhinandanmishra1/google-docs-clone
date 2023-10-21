import { useMutation, useQuery } from "react-query";
import { getAxios, queryClient } from ".";
import { saveAs } from "file-saver";
import { pdfExporter } from "quill-to-pdf";

export const useGetDocumentsQuery = (params) => {
  return useQuery({
    queryKey: ["useGetDocumentsQuery", params],
    queryFn: async () => {
      const { data } = await getAxios().get("/documents", {
        params,
      });
      return data;
    },
    cacheTime: 0,
  });
};

export const useGetDocumentQuery = (id) => {
  return useQuery({
    queryKey: ["useGetDocumentQuery", id],
    queryFn: async () => {
      const { data } = await getAxios().get(`/documents/${id}`);

      return data.document;
    },
  });
};

export const useExportDocumentToPdfMutation = () => {
  return useMutation({
    mutationFn: async (id) => {
      const { data } = await getAxios().get(`/documents/${id}`);

      return data?.document;
    },
    onSuccess: async (document) => {
      const content = document?.data;
      const pdfAsBlob = await pdfExporter.generatePdf(content); // converts to PDF
      saveAs(pdfAsBlob, `${document.name || "Untitled"}.pdf`); // downloads from the browser
    },
    onError: (err) => {
      console.log(err);
    },
  });
};

export const useUpdateDocumentMutation = (id, onSuccess) => {
  return useMutation({
    mutationFn: async (rawData) => {
      const { data } = await getAxios().put(`/documents/${id}`, rawData);

      return data;
    },
    onSuccess: () => {
      // Todo: add notification
      queryClient.refetchQueries(["useGetDocumentsQuery"]);
      onSuccess();
    },
    onError: () => {
      // Todo: add notification
    },
  });
};

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

export const useCreateDocumentMutation = (onSuccess, onError) => {
  return useMutation({
    mutationFn: async (
      rawData = {
        data: {},
        name: "Untitled",
      }
    ) => {
      const { data } = await getAxios().post("/documents", rawData, {
        withCredentials: true,
      });

      return data;
    },
    onSuccess,
    onError,
  });
};
