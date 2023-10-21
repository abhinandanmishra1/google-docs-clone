import axios from "axios";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

import { createContext, useContext, useEffect, useState } from "react";
import { getAxios } from "../../service";

const DocumentContext = createContext(null);

export const DocumentProvider = ({ children }) => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["document", id],
    queryFn: async () => {
      const { data } = await getAxios().get(`/documents/${id}`);

      return data;
    },
  });

  const [value, setValue] = useState({
    document: data?.document,
    role: data?.role || "none",
    name,
    setName,
    users,
    setUsers,
    documentLoading: isLoading,
    documentError: error,
  });

  useEffect(() => {
    if (data?.name) {
      setName(data.name);
    }
  }, [data]);

  useEffect(() => {
    setValue((prev) => ({
      ...prev,
      document: data?.document,
      role: data?.role || "none",
      name,
      setName,
      users,
      setUsers,
      documentLoading: isLoading,
      documentError: error,
    }));
  }, [data, name, setName, users, setUsers, isLoading, error]);

  return (
    <DocumentContext.Provider value={value}>
      {children}
    </DocumentContext.Provider>
  );
};

export const useDocumentContext = () => {
  return useContext(DocumentContext);
};
