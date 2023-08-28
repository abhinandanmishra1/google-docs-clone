import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home";
import { Document } from "./components/Document";
import { Signin } from "./pages/Signin";
import { UserProvider } from "./context/UserContext";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient()

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/document/:id" element={<Document />} />
            <Route path="/signin" element={<Signin />} />
          </Routes>
        </UserProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
