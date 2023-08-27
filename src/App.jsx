import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home";
import { Document } from "./components/Document";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/document/:id" element={<Document />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
