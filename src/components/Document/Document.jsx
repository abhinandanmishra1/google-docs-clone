import React from "react";
import { useUserContext } from "../../context/UserContext";
import { useDocumentContext } from "./DocumentContex";
import { DocumentHeader } from "../Header";
import { Editor } from "./TextEditor/Editor";
import { Loading } from "../../common";
import { Error } from "../../common/Error";

export const Document = () => {
  const { user, loading } = useUserContext();
  const { role, documentLoading, documentError } = useDocumentContext();

  if (loading || documentLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  if (documentError) {
    if (role == "none") {
      return (
        <Error
          message="You don't have access to this document"
          type="forbidden"
        />
      );
    }

    return <Error />;
  }

  return (
    <div className="w-full relative">
      <DocumentHeader user={user} />
      <Editor />
    </div>
  );
};
