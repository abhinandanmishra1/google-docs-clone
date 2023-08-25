import { Apps, Clear, Description, Menu, Search } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useState } from "react";
import { Show } from "../../blocks/Show";

export const Header = () => {
  const [query, setQuery] = useState("");

  const clearQuery = () => {
    setQuery("");
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
      <div className="flex gap-[24px] items-center flex-none">
        <IconButton>
          <Apps className="text-gray-light h-[12px] w-[18px]" />
        </IconButton>
        <img
          src="https://lh3.googleusercontent.com/ogw/AGvuzYYBpM3NJSU_Y0XbxRh4u5nH3nOXs7IzUSfhL_ovTA=s32-c-mo"
          alt="user"
          className="rounded-full"
        />
      </div>
    </section>
  );
};
