import axios from "axios";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

import { createContext, useContext, useEffect, useState } from "react";
import { getAxios } from "../../service";

const DocumentContext = createContext(null);

export const DocumentProvider = ({ children }) => {
  const { id } = useParams();
  const [name, setName] = useState("");

  const { data } = useQuery({
    queryKey: ["document", id],
    queryFn: async () => {
      const { data } = await getAxios().get(`/documents/${id}`);

      return data.document;
    },
  });
  const [value, setValue] = useState({ document: data, name, setName });

  useEffect(() => {
    if (data?.name) {
      setName(data.name);
    }
  }, [data]);


  useEffect(() => {
    setValue({ document: data, name, setName });
  }, [data, name, setName]);

  return (
    <DocumentContext.Provider value={value}>
      {children}
    </DocumentContext.Provider>
  );
};

export const useDocumentContext = () => {
  return useContext(DocumentContext);
};
