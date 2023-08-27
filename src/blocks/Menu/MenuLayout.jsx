import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { Button, Menu, styled } from "@mui/material";
import { Dropdown } from "./Dropdown";

const StyledButton = styled(Button)({
  "&:hover": {
    backgroundColor: "#e8ebee",
  },
  padding: "0px 8px",
  justifyContent: "start",
  minWidth: "fit-content",
});

export const MenuLayout = ({ items, name }) => {
  return (
    <>
      <Dropdown
        trigger={
          <StyledButton
            id="basic-button"
            aria-haspopup="true"
            variant="text"
            classes={{ root: "hover:bg-green p-0" }}
          >
            <p className="text-gray-light capitalize font-normal p-0 self-start">
              {name}
            </p>
          </StyledButton>
        }
        menu={items}
      />
    </>
  );
};
