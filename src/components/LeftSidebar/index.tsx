import { ReactNode, useState } from "react";

//
import Graphics from "./Graphics";
import MyFiles from "./MyFiles";




const LeftSidebar = () => {
  const [activeTab, setActiveTab] = useState<{
    name: string,
    component: ReactNode
  }>({
    name: 'graphics',
    component: <Graphics />
  });

  return (
    <div className="w-[280px] overflow-y-auto flex flex-col h-full border-r border-l-neutral-200 p-[10px] bg-white">
      <div className="flex justify-around space-x-1 rounded-lg bg-slate-100 p-2">
        <button
          onClick={() => setActiveTab({
            name: 'graphics',
            component: <Graphics />
          })}
          className={`flex items-center rounded-md py-[0.4375rem] pl-3 pr-3 text-[16px] font-semibold lg:pr-3 ${
            activeTab.name === "graphics" ? "bg-white shadow" : ""
          }`}
        >
          Graphics
        </button>
        <button
          onClick={() => setActiveTab({
            name: 'files',
            component: <MyFiles />
          })}
          className={`flex items-center rounded-md py-[0.4375rem] pl-3 pr-3 text-[16px] font-semibold lg:pr-3 ${
            activeTab.name === "files" ? "bg-white shadow" : ""
          }`}
        >
          My files
        </button>
      </div>
      {activeTab.component}
    </div>
  );
};

export default LeftSidebar;
