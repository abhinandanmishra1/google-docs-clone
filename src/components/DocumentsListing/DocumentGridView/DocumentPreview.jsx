import { Article, MoreVert } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";
import { MoreButton } from "../../../blocks/MoreButton";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

export const DocumentPreview = ({ document }) => {
  const date = format(new Date(document.modifiedAt), "dd MMM, yyyy");
  const navigate = useNavigate();
  const openDocument = () => {
    navigate(`/document/d/${document.id}`);
  };

  return (
    <div className="w-[210px] h-[280px] border-[1px] flex flex-col rounded cursor-pointer hover:border-blue-light">
      <img
        src="https://lh3.google.com/u/0/d/1H15AwLvTdl7Gg6tdHWg2Ohj7MbK8TCsTpxC4_wQqoEQ=w208-iv3"
        className="h-[200px] w-full rounded "
        onClick={openDocument}
      />
      <div className="flex flex-col p-2 border-t-[1px]">
        <h2 className="text-base text-gray-dark font-medium">
          {document.name}
        </h2>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-[5px]">
            <Article className="text-blue-light" />
            <p className="text-gray-darker text-sm">{date}</p>
          </div>
          <MoreButton document={document} />
        </div>
      </div>
    </div>
  );
};
