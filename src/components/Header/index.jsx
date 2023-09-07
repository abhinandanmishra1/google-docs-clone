import { Apps, Clear, Description, Menu, Search } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { Show } from "../../blocks/Show";
import { Link } from "react-router-dom";

export const Header = ({ user }) => {
  const [query, setQuery] = useState("");

  const clearQuery = () => {
    setQuery("");
  };

  const logout = () => {
    window.open(
      `${import.meta.env.VITE_DOCS_SERVER_BASE_URL}/auth/logout`,
      "_self"
    );
    localStorage.clear();
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
        <text className="text-gray-light text-xl">Docs</text>
      </div>
      <div className="bg-gray-lighter pr-[50px] pl-[9px] flex items-center flex-1 max-w-[700px] rounded-lg py-[4px] focus-within:bg-white focus-within:shadow-md">
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
          <IconButton>
            <Apps className="text-gray-light h-[12px] w-[18px]" />
          </IconButton>
          <div className="cursor-pointer">
            <IconButton
              onClick={toggle}
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

            <div
              className={`absolute w-[350px] right-6 p-4 flex flex-col items-center bg-[#e9eef6] z-10 rounded-[28px] shadow-custom gap-3 ${
                open ? "block" : "hidden"
              }`}
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
