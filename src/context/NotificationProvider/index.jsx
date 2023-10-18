import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";

const NotificationContext = React.createContext(null);

export const NotificationProvider = ({ children }) => {
  const [message, setMessage] = React.useState("");
  const [type, setType] = React.useState("success");
  const [open, setOpen] = React.useState(false);

  const openNotification = () => {
    setOpen(true);
  };

  const handleClose = (_event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <NotificationContext.Provider
      value={{
        setMessage,
        setType,
        openNotification,
      }}
    >
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        key={"top" + "right"}
      >
        <Alert elevation={6} variant="filled" onClose={handleClose} severity={type} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => {
  return React.useContext(NotificationContext);
};
