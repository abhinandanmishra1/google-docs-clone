import axios from "axios";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

import { createContext, useContext, useEffect, useState } from "react";

const DocumentContext = createContext(null);

export const DocumentProvider = ({ children }) => {
  const { id } = useParams();
  const [name, setName] = useState("");

  const { data } = useQuery({
    queryKey: ["document", id],
    queryFn: async () => {
      const { data } = await axios.get(`http://localhost:5000/documents/${id}`);

      return data;
    },
  });

  useEffect(() => {
    if (data?.name) {
      setName(data.name);
    }
  }, [data]);
  console.log(data);

  const [value, setValue] = useState({ document: data, name, setName });

  useEffect(() => {
    setValue({ document: data, name, setName });
    console.log("inside context", value);
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
