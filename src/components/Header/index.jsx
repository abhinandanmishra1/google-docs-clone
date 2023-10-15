import { Apps, Clear, Description, Menu, Search } from "@mui/icons-material";
import { Button, IconButton, Popover } from "@mui/material";
import { useEffect, useState } from "react";
import { Show } from "../../blocks/Show";
import { Link } from "react-router-dom";
import { queryClient } from "../../service/query";

export const Header = ({ user }) => {
  const [query, setQuery] = useState("");
  const [anchor, setAnchor] = useState(null);
  const openPopover = (event) => {
    setAnchor(event.currentTarget);
  };

  const clearQuery = () => {
    setQuery("");
  };

  const logout = () => {
    window.open(
      `${import.meta.env.VITE_DOCS_SERVER_BASE_URL}/auth/logout`,
      "_self"
    );
    localStorage.clear();
    queryClient.refetchQueries(["useGetUserQuery"]);
  };

  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen((open) => !open);
  };

  return (
    <section className="flex justify-between p-[8px] bg-white gap-[10px] items-center">
      <div className="flex grow-0 items-center flex-none">
        <IconButton>
          <Menu className="text-gray-light h-[12px] w-[18px]" />
        </IconButton>
        <Description
          className="text-blue-light"
          style={{
            width: "48px",
            height: "48px",
          }}
        />
        <p className="text-gray-light text-xl hidden md:block">Docs</p>
      </div>
      <div className="hidden bg-gray-lighter pr-[50px] pl-[9px] sm:flex items-center flex-1 max-w-[700px] rounded-lg py-[4px] focus-within:bg-white focus-within:shadow-md">
        <Search className="text-gray-light flex-none" />
        <input
          type="text"
          placeholder="Search"
          value={query}
          className="bg-transparent outline-none p-[8px] flex-1"
          onChange={(e) => setQuery(e.target.value)}
        />
        <Show iff={!!query}>
          <IconButton onClick={clearQuery}>
            <Clear className="text-gray-light h-[12px] w-[18px] flex-none" />
          </IconButton>
        </Show>
      </div>
      <Show iff={!!user}>
        <div className="flex gap-[24px] items-center flex-none" id="user">
          <div className="hidden md:block">
            <IconButton>
              <Apps className="text-gray-light h-[12px] w-[18px]" />
            </IconButton>
          </div>
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
              <div
                className={`flex flex-col items-center shadow-custom gap-3 p-2`}
              >
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
        </div>
      </Show>
      <Show iff={!user}>
        <Link to="signin">
          <Button variant="contained" color="primary">
            Login
          </Button>
        </Link>
      </Show>
    </section>
  );
};

export * from "./DocumentHeader";
