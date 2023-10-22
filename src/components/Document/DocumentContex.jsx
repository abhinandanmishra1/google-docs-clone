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
  const [editorDisabled, setEditorDisabled] = useState(true);

  const { data, isLoading, error } = useQuery({
    queryKey: ["document", id],
    queryFn: async () => {
      const { data } = await getAxios().get(`/documents/${id}`);

      return data;
    },
    refetchInterval: false,
    retry: false
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
    editorDisabled,
  });

  useEffect(() => {
    if(!value) return;

    if (value.role === "admin" || value.role === "editor" || value.role === "owner") {
      setEditorDisabled(false);
    } else {
      setEditorDisabled(true);
    }
  }, [value]);

  useEffect(() => {
    if (data?.document?.name) {
      setName(data.document.name);
    }
  }, [data]);

  useEffect(() => {
    setValue((prev) => ({
      ...prev,
      document: data?.document,
      role: data?.role || "none",
      name: data?.document?.name,
      setName,
      users,
      setUsers,
      documentLoading: isLoading,
      documentError: error,
      editorDisabled,
    }));
  }, [data, name, setName, users, setUsers, isLoading, error, editorDisabled]);

  return (
    <DocumentContext.Provider value={value}>
      {children}
    </DocumentContext.Provider>
  );
};

export const useDocumentContext = () => {
  return useContext(DocumentContext);
};
