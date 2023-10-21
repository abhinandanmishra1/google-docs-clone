import React, { useState } from "react";
import { useUserContext } from "../../context/UserContext";
import { AiOutlineUser } from "react-icons/ai";
import { Button, IconButton, Popover } from "@mui/material";

export const UserPopover = () => {
  const { user, loading } = useUserContext();
  const [anchor, setAnchor] = useState(null);
  const openPopover = (event) => {
    setAnchor(event.currentTarget);
  };
  const logout = () => {
    window.open(
      `${import.meta.env.VITE_DOCS_SERVER_BASE_URL}/auth/logout`,
      "_self"
    );
    localStorage.clear();
    queryClient.refetchQueries(["useGetUserQuery"]);
  };

  if (loading) {
    return (
      <>
        <div className="cursor-not-allowed">
          <AiOutlineUser className="rounded-full h-[32px] w-[32px]" />
        </div>
      </>
    );
  }

  return (
    <div className="cursor-pointer">
      <IconButton
        onClick={openPopover}
        className="rounded-full"
        sx={{
          padding: "4px",
        }}
      >
        <img
          src={user.picture}
          alt="user"
          className="rounded-full h-[32px] w-[32px]"
        />
      </IconButton>

      <Popover
        open={Boolean(anchor)}
        anchorEl={anchor}
        onClose={() => setAnchor(null)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        className="w-full rounded-3xl"
      >
        <div className={`flex flex-col items-center shadow-custom gap-3 p-2`}>
          <img
            src={user.picture}
            alt="user"
            className="rounded-full h-[86px] w-[86px]"
          />
          <h1 className="text-lg">Hi, {user.name}</h1>
          <Button variant="contained" color="inherit" onClick={logout}>
            Logout
          </Button>
        </div>
      </Popover>
    </div>
  );
};
