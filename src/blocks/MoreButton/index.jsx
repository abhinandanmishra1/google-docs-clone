import { DeleteForeverOutlined, DeleteOutlined, DriveFileRenameOutline, FormatSizeOutlined, MoreVert, OfflinePinOutlined, OpenInNewOutlined } from "@mui/icons-material";
import { IconButton, ToggleButton } from "@mui/material";
import React from "react";

export const MoreButton = () => {
  const [open, setOpen] = React.useState(false);

  const toggle = () => {
    setOpen(open => !open);
  }

  return (
    <div className="relative">
      <IconButton>
        <MoreVert onClick={toggle} />
      </IconButton>
      <ul onClick={toggle} className={`${open ? "block" : "hidden"} absolute top-4 border bg-white p-2 w-[300px] z-10 rounded shadow`}>
        <li className="flex p-1 gap-7"><FormatSizeOutlined /> Rename</li>
        <li className="flex p-1 gap-7"><DeleteOutlined/> Remove</li>
        <li className="flex p-1 gap-7"><OpenInNewOutlined />Open in new tab</li>
        <li className="flex p-1 gap-7"><OfflinePinOutlined/> Available offline <ToggleButton /></li>
      </ul>
    </div>
  );
};
