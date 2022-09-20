import { Routes, Route } from "react-router";
// pages
import Main from "./pages/Main";
import Design from "./pages/Design";
import Preview from "./pages/Preview";

function App() {
  return (
    <Routes>
      <Route path="/:id" element={<Design />} />
      <Route path="/" element={<Main />} />
      <Route path="/preview/:id" element={<Preview />} />
    </Routes>
  );
}

export default App;
