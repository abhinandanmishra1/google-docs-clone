import {
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import Quill from "quill";
import { Navigate } from "react-router-dom";
import { useSocketConnection } from "./useSocketConnection";
import { useDocumentLoad } from "./useDocumentLoad";
import { useEditorChange } from "./useEditorChange";
import { useSaveDocument } from "./useSaveDocument";

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }, { size: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }, { indent: "-1" }, { indent: "+1" }],
  ["link", "image", "blockquote", "code-block"],
  [{ direction: "rtl" }],
];
const EditorContext = createContext(null);

export const EditorProvider = ({ children }) => {
  const { socket, token } = useSocketConnection();
  const [editorDisabled, setEditorDisabled] = useState(true);
  const [editor, setEditor] = useState();

  useDocumentLoad(editor, socket, setEditorDisabled);
  useEditorChange(editor, socket);
  useSaveDocument(editor, socket, editorDisabled);

  const wrapperRef = useCallback((wrapper) => {
    if (!wrapper) return;

    wrapper.innerHTML = "";

    const editor = document.createElement("div");
    wrapper.append(editor);

    const quillEditor = new Quill(editor, {
      theme: "snow",
      modules: {
        toolbar: TOOLBAR_OPTIONS,
      },
    });

    quillEditor?.disable();
    setEditor(quillEditor);
  }, []);

  if (!token) {
    return <Navigate to="/signin" />;
  }

  return (
    <EditorContext.Provider
      value={{
        wrapperRef,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};

export const useEditorContext = () => {
  return useContext(EditorContext);
};
