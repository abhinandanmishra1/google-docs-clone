import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home";
import { TextEditor } from "./components/TextEditor";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/document/:id" element={<TextEditor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
