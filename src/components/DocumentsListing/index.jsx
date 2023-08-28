import { useState } from "react";
import { Show, Select } from "../../blocks";
import {
  Folder,
  FolderOffOutlined,
  FolderOpenOutlined,
  GridView,
  List,
  ListAlt,
  ListAltOutlined,
  ListAltRounded,
  SortByAlphaTwoTone,
} from "@mui/icons-material";
import { Box, CircularProgress, IconButton } from "@mui/material";
import { DocumentGridView } from "../DocumentGridView";
import { DocumentListView } from "../DocumentListView";
import { useQuery } from "react-query";
import axios from "axios";

export const DocuemntListing = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["documents"],
    queryFn: async () => {
      const { data } = await axios.get("http://localhost:5000/documents");
      return data;
    },
    cacheTime: 0,
  });

  const [filters, setFilters] = useState({
    ownedBy: "owned_by_me",
  });

  const [view, setView] = useState("list");

  const toggleView = () => {
    setView((prev) => (prev === "list" ? "grid" : "list"));
  };

  const options = [
    { value: "owned_by_anyone", label: "Owned by anyone" },
    { value: "owned_by_me", label: "Owned by me" },
    { value: "not_owned_by_me", label: "Not owned by me" },
  ];

  const onSelectChange = (value) => {
    setFilters({ ...filters, ownedBy: value });
  };

  if (isLoading) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div className="bg-white flex justify-center h-full">
      <div className="max-w-4xl w-full py-4 h-full">
        <div className="  flex justify-between items-center">
          <p>Recent Documents</p>
          <div className="flex items-center h-4">
            <Select
              onChange={onSelectChange}
              name="ownedBy"
              options={options}
              placeholder="Owned by anyone"
              initialValue="owned_by_anyone"
              value={filters.ownedBy}
            />

            <Show iff={view === "grid"}>
              <IconButton>
                <ListAltRounded onClick={toggleView} />
              </IconButton>
            </Show>
            <Show iff={view === "list"}>
              <IconButton>
                <GridView onClick={toggleView} />
              </IconButton>
            </Show>
            <IconButton>
              <SortByAlphaTwoTone />
            </IconButton>
            <IconButton>
              <FolderOpenOutlined />
            </IconButton>
          </div>
        </div>
        <div className="h-full">
          <Show iff={view === "grid"}>
            <DocumentGridView data={data?.data} />
          </Show>
          <Show iff={view === "list"}>
            <DocumentListView data={data?.data || []} />
          </Show>
        </div>
      </div>
    </div>
  );
};
