import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home";
import { Signin } from "./pages/Signin";
import { UserProvider } from "./context/UserContext";
import { QueryProvider } from "./service/query";
import { useRefreshToken } from "./hooks/useRefreshToken";
import { DocumentTiny } from "./components/Document/DocumentTiny";

function App() {
  useRefreshToken();

  return (
    <BrowserRouter>
      <QueryProvider>
        <UserProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/document/d/:id" element={<DocumentTiny />} />
            <Route path="/signin" element={<Signin />} />
          </Routes>
        </UserProvider>
      </QueryProvider>
    </BrowserRouter>
  );
}

export default App;
