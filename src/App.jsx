import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home";
import { Document } from "./components/Document";
import { Signin } from "./pages/Signin";
import { UserProvider } from "./context/UserContext";
import { QueryProvider } from "./service/query";

function App() {
  return (
    <BrowserRouter>
      <QueryProvider>
        <UserProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/document/:id" element={<Document />} />
            <Route path="/signin" element={<Signin />} />
          </Routes>
        </UserProvider>
      </QueryProvider>
    </BrowserRouter>
  );
}

export default App;
