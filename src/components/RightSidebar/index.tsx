import { useState } from "react";

// components
import Edit from './Edit'
import Layers from "./Layers";
import Pages from "./Pages";
// icons
import IcTg from "../../utils/svg/icon_telegram.svg";



const RightSidebar = () => {
  const [activeTab, setActiveTab] = useState(
    {name: "edit", component: <Edit />}
  );

  return (
    <div className="w-[280px] flex flex-col h-full border-l border-l-neutral-200 p-[10px] bg-white">
      <div className="flex justify-around  space-x-1 rounded-lg bg-slate-100 p-2">
        <button
          onClick={() => setActiveTab({
            name: 'edit',
            component: <Edit />,
          })}
          className={`flex items-center text-[16px] rounded-md py-[0.4375rem] pl-3 pr-3 font-semibold lg:pr-3 ${
            activeTab.name === "edit" ? "bg-white shadow" : ""
          }`}
        >
          Edit
        </button>
        <button
          onClick={() => setActiveTab({
            name: 'layers',
            component: <Layers />,
          })}
          className={`flex items-center text-[16px] rounded-md py-[0.4375rem] pl-3 pr-3 font-semibold lg:pr-3 ${
            activeTab.name === "layers" ? "bg-white shadow" : ""
          }`}
        >
          Layers
        </button>
        <button
          onClick={() => setActiveTab({
            name: 'pages',
            component: <Pages />,
          })}
          className={`flex items-center text-[16px] rounded-md py-[0.4375rem] pl-3 pr-3 font-semibold lg:pr-3 ${
            activeTab.name === "pages" ? "bg-white shadow" : ""
          }`}
        >
          Pages
        </button>
      </div>
      {activeTab.component}
      <div className="h-auto flex justify-center items-end">
        <span className="text-gray-500">Contact the founder:</span>
        <a
          href="https://t.me/nesppp"
          target="_blank"
          className="ml-[10px]"
          rel="noreferrer"
        >
          <img height={30} width={30} src={IcTg} alt="tg" />
        </a>
      </div>
    </div>
  );
};

export default RightSidebar;
