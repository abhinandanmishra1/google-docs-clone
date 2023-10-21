import React from "react";
import { GiTerror } from "react-icons/gi";
import { MdOutlineNoEncryptionGmailerrorred } from "react-icons/md";

const Icon = {
  forbidden: <MdOutlineNoEncryptionGmailerrorred />,
  basic: <GiTerror />,
};

export const Error = ({
  message = "There was an error in loading the document!",
  type = "basic",
}) => {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="flex flex-col gap-2 items-center">
        {React.cloneElement(Icon[type], {
          className: "text-6xl text-red-500",
        })}
        <p>{message}</p>
      </div>
    </div>
  );
};
