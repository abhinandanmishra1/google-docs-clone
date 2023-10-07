import React from "react";
import { DocumentPreview } from "./DocumentPreview";

export const DocumentGridView = ({ data: documents }) => {
  return (
    <div className="mt-2 flex gap-[10px] flex-wrap h-full min-h-[400px]">
      {
        (documents || [])?.map((document) => {
          return <DocumentPreview document={document} key={document.id} />
        })
      }
    </div>
  );
};
