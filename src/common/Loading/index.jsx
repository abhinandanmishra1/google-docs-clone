import { Box, CircularProgress } from "@mui/material";
import { FullCenter } from "../../blocks";

export const Loading = () => {
  return (
    <FullCenter>
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    </FullCenter>
  );
};
