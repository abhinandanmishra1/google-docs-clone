import { useState } from "react";
import { Show, Select, FullCenter } from "../../blocks";
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
import { DocumentGridView } from "./DocumentGridView";
import { DocumentListView } from "./DocumentListView";
import { useGetDocumentsQuery } from "../../service";
import { Loading } from "../../common";

export const DocuemntListing = () => {
  const [filters, setFilters] = useState({
    ownedBy: "me",
  });

  const { data, isLoading } = useGetDocumentsQuery(filters);
  const [view, setView] = useState("list");

  const toggleView = () => {
    setView((prev) => (prev === "list" ? "grid" : "list"));
  };

  const options = [
    { value: "any", label: "Owned by anyone" },
    { value: "me", label: "Owned by me" },
    { value: "others", label: "Not owned by me" },
  ];

  const onSelectChange = (value) => {
    setFilters({ ...filters, ownedBy: value });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="bg-white flex justify-center h-full">
      <div className="max-w-4xl w-full py-4 h-full px-2">
        <div className="  flex justify-between items-center">
          <p>Recent Documents</p>
          <div className="hidden md:flex items-center h-4">
            <Select
              onChange={onSelectChange}
              name="ownedBy"
              options={options}
              placeholder="Owned by anyone"
              initialValue="me"
              value={filters.ownedBy}
            />

            <Show iff={view === "grid"}>
              <IconButton onClick={toggleView}>
                <ListAltRounded />
              </IconButton>
            </Show>
            <Show iff={view === "list"}>
              <IconButton onClick={toggleView}>
                <GridView />
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
