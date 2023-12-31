import { Article } from "@mui/icons-material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { MoreButton } from "../../../blocks/MoreButton";
import { format } from "date-fns";

export const DocumentPreview = ({ document }) => {
  const date = format(new Date(document.modifiedAt), "dd MMM, yyyy");
  const navigate = useNavigate();
  const openDocument = () => {
    navigate(`/document/d/${document.id}`);
  };

  return (
    <div className="flex w-full rounded-full hover:bg-blue-100 cursor-pointer items-center justify-between gap-[5px] px-2">
      <div className="flex gap-[10px] grow max-w-[90%]" onClick={openDocument}>
        <Article className="text-blue-light" />
        <div className="flex justify-between flex-grow items-center gap-[10px]">
          <p className="grow">{document.name}</p>
          <p className="text-gray-darker text-sm w-[80px] hidden md:block">me</p>
          <p className="text-gray-darker text-sm w-[155px] hidden md:block">{date}</p>
        </div>
      </div>
      <MoreButton document={document} />
    </div>
  );
};
