import { useState } from "react";
//
import { useNavigate } from "react-router";
//
import axios from "axios";

const Main = () => {
  const [title, setTitle] = useState<string | undefined>(undefined);

  const navigate = useNavigate();

  const onHandleCreateDesign = async () => {
    try {
      const res: any = await axios.post(`${process.env.api_back}/design/create`, title && {
        title,
      });

      if (res.status === 201) {
        navigate(`/${res.data.id}`);
      }
    } catch (error) {}
  };

  return (
    <div className="h-full flex items-center justify-center flex-col">
      <div className="flex h-full items-center">
        <div className="p-[20px] mt-[100px] bg-white flex flex-col shadow-md rounded-md">
          <span className="text-[22px] text-slate-800 font-bold font-[Nunito]">
            Create new Design
          </span>
          <div>
            <div className="mt-1 flex rounded-md shadow-sm">
              <span className="py-[3px] text-[18px] rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-2  text-gray-500">
                Title
              </span>
              <input
                placeholder="not required"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full focus:px-[9px] px-[10px] rounded-r-md border border-gray-300 outline-none focus:border-indigo-500 focus:border-[2px] focus:ring-indigo-500"
                type="text"
              />
            </div>
            <button
              onClick={onHandleCreateDesign}
              className="bg-indigo-500 w-full text-[20px] rounded-md mt-[10px] text-white hover:bg-indigo-600"
            >
              Create
            </button>
          </div>
        </div>
      </div>
      <div className="flex py-[20px]">
        <div className="p-[15px] max-w-[1000] flex flex-col mt-[40px] bg-white shadow-sm rounded-md">
          <span className="text-[22px] font-[Nunito] text-slate-800 font-bold">
            Current Designs
          </span>
          <div className="grid grid-flow-col gap-[20px] pt-[10px]">
            <div className="flex flex-col">
              <div className="w-[80px] bg-slate-200 rounded-lg h-[80px]" />
              <span className="text-[14px]">Title</span>
            </div>
            <div className="flex flex-col">
              <div className="w-[80px] bg-slate-200 rounded-lg h-[80px]" />
              <span className="text-[14px]">Title</span>
            </div>
            <div className="flex flex-col">
              <div className="w-[80px] bg-slate-200 rounded-lg h-[80px]" />
              <span className="text-[14px]">Title</span>
            </div>
            <div className="flex flex-col">
              <div className="w-[80px] bg-slate-200 rounded-lg h-[80px]" />
              <span className="text-[14px]">Title</span>
            </div>
            <div className="flex flex-col">
              <div className="w-[80px] bg-slate-200 rounded-lg h-[80px]" />
              <span className="text-[14px]">Title</span>
            </div>
            <div className="flex flex-col">
              <div className="w-[80px] bg-slate-200 rounded-lg h-[80px]" />
              <span className="text-[14px]">Title</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
