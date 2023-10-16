import React, { useEffect, useRef, useState } from "react";
import { Editor as TinyMceEditor } from "@tinymce/tinymce-react";
import { useSocketConnection } from "../../../context/useSocketConnection";
import { useTinyEditorChange } from "../../../context/useEditorChange";
import { useTinySaveDocument } from "../../../context/useSaveDocument";
import { useTinyDocumentLoad } from "../../../context/useDocumentLoad";
import { useParams } from "react-router-dom";
import debounce from "lodash.debounce";

export function Editor() {
  const { id } = useParams();
  const editorRef = useRef(null);
  const [isSetContent, setIsSetContent] = useState(false);
  const [editor, setEditor] = useState();
  const [value, setValue] = useState("");

  const [editorDisabled, setEditorDisabled] = useState(false);

  const { socket } = useSocketConnection();

  useTinySaveDocument(editorRef.current, socket);
  useTinyDocumentLoad(editorRef.current, socket, setEditorDisabled);
  const { onEditorChange } = useTinyEditorChange(editorRef.current, socket);

  useEffect(() => {
    editor;
  }, [editor]);

  // this is called when value changes
  // useEffect(() => {
  //   onEditorChange(value);
  // }, [value]);

  return (
    <div className="editor-container w-full min-h-screen h-screen">
      <TinyMceEditor
        apiKey={import.meta.env.VITE_TINY_EDITOR_CLIENT_KEY}
        onInit={(evt, editor) => {
          editorRef.current = editor;
          setEditor(editor);
        }}
        value={value}
        disabled={editorDisabled}
        onSetContent={() => setIsSetContent(true)}
        onEditorChange={(editorData) => {
          setValue(prev => editorData)

          if(isSetContent) {
            setIsSetContent(false);
            return;
          }
          
          onEditorChange(editorData);
        }}
        init={{
          height: "100%",
          min_height: "100dvh",
          width: "100%",
          resize: false,
          plugins: [
            // "print",
            "preview",
            // "paste",
            "importcss",
            "searchreplace",
            "autolink",
            "autosave",
            "save",
            "directionality",
            "code",
            "visualblocks",
            "visualchars",
            "fullscreen",
            "image",
            "link",
            "media",
            "template",
            "codesample",
            "table",
            "charmap",
            // "hr",
            "pagebreak",
            "nonbreaking",
            "anchor",
            // "toc",
            "insertdatetime",
            "advlist",
            "lists",
            "wordcount",
            // "imagetools",
            // "textpattern",
            // "noneditable",
            "help",
            "charmap",
            "quickbars",
            "emoticons",
          ],
          toolbar:
            "undo redo | bold italic underline strikethrough | fontselect fontsizeselect | alignleft aligncenter alignright alignjustify | outdent indent | bullist numlist | forecolor backcolor removeformat | pagebreak | link image media codesample | removeformat ",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          menubar: "file edit view insert format tools table ",
        }}
      />
    </div>
  );
}

/*


*/
