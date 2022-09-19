// components
import { Canvas, Navbar, LeftSidebar, RightSidebar } from "./components";
// hooks
import { useTypedSelector } from "./hooks";

function App() {
  const { elements } = useTypedSelector((state) => state.canvas);

  return (
    <div className="flex flex-col h-full">
      <Navbar />
      <div className="flex justify-between h-full w-full">
        <LeftSidebar />
        <Canvas elements={elements} />
        <RightSidebar />
      </div>
    </div>
  );
}

export default App;
