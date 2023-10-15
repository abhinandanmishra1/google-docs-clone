import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useDocumentContext } from "../components/Document/DocumentContex";
import { Navigate, useParams } from "react-router-dom";

const EditorContext = createContext(null);

export const EditorTinyProvider = ({ children }) => {
  const token = localStorage.getItem("authToken");
  const [editorDisabled, setEditorDisabled] = useState(true);
  const [socket, setSocket] = useState();
  const [editor, setEditor] = useState();

  const { name, setName } = useDocumentContext();

  const { id: documentId } = useParams();

  if (!token) {
    return <Navigate to="/signin" />;
  }

  return (
    <EditorContext.Provider
      value={{
        name
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};

export const useEditorContext = () => {
  return useContext(EditorContext);
};
