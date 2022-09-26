import { memo, useEffect, useState } from "react";
// hooks
import { useTypedSelector } from "../../hooks";



type InfoProps = {
  onChangeActiveTab: any
  activeTab: any
}
const Info = ({ onChangeActiveTab, activeTab }: InfoProps) => {
  // getters
  const { title } = useTypedSelector((state) => state.canvas);

  const [localTitle, setLocalTitle] = useState("");

  useEffect(() => {
    setLocalTitle(title);
  }, [title]);

  return (
    <div className="p-[15px] flex justify-between w-[950px] shadow-md rounded-lg bg-white">
      <div className="flex rounded-md shadow-sm">
        <span className="py-[3px] text-[18px] items-center justify-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-[15px] text-gray-500">
          Title
        </span>
        <input
          value={localTitle}
          onChange={(e) => setLocalTitle(e.target.value)}
          // onBlur={() => onHandleBlur("height", localHeight)}
          className="w-full px-[10px] focus:px-[9px] rounded-r-md border border-gray-300 outline-none focus:border-indigo-500 focus:border-[2px] focus:ring-indigo-500 sm:text-sm"
          type="text"
        />
      </div>
      <div className="w-full flex items-center justify-center">
        <Tabs 
          onChangeActiveTab={onChangeActiveTab}
          activeTab={activeTab}
        />
      </div>
      <button className="bg-indigo-500 hover:bg-indigo-600 py-[3px] px-[12px] text-white font-[Nunito] text-[18px] rounded-md font-bold">
        preview
      </button>
    </div>
  );
};


type TabsProps = {
  onChangeActiveTab: any
  activeTab: any
}
const Tabs = ({ onChangeActiveTab, activeTab }: TabsProps) => {
  


  return (
    <div className="tabs tabs-boxed font-medium">
      <button 
        onClick={() => onChangeActiveTab('api')}
        className={`tab ${activeTab.name === 'api' ? 'tab-active' : ''}`}
      >
        API
      </button>
      <button 
        onClick={() => onChangeActiveTab('code')}
        className={`tab ${activeTab.name === 'code' ? 'tab-active' : ''}`}
      >
        CODE
      </button>
    </div>
  );
}

export default Info
