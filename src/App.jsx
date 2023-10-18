import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home";
import { Signin } from "./pages/Signin";
import { UserProvider } from "./context/UserContext";
import { QueryProvider } from "./service/query";
import { useRefreshToken } from "./hooks/useRefreshToken";
import { DocumentTiny } from "./components/Document/DocumentTiny";
import { ThemeProvider, createTheme } from "@mui/material";
import { NotificationProvider } from "./context/NotificationProvider";

const theme = createTheme({
  typography: {
    button: {
      textTransform: "none",
      margin: 0,
      padding: 0,
    },
  },
});

function App() {
  useRefreshToken();

  return (
    <BrowserRouter>
      <QueryProvider>
        <UserProvider>
          <ThemeProvider theme={theme}>
            <NotificationProvider>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/document/d/:id" element={<DocumentTiny />} />
                <Route path="/signin" element={<Signin />} />
              </Routes>
            </NotificationProvider>
          </ThemeProvider>
        </UserProvider>
      </QueryProvider>
    </BrowserRouter>
  );
}

export default App;
