import { Routes, Route } from "react-router";
// pages
import Main from "./pages/Main";
import Design from "./pages/Design";

function App() {
  return (
    <Routes>
      <Route path="/:id" element={<Design />} />
      <Route path="/" element={<Main />} />
    </Routes>
  );
}

export default App;
