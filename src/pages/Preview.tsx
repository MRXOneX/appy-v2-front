import { memo, useState } from "react";
import { useNavigate, useParams } from "react-router";

const Preview = () => {
    const param = useParams()

    const navigate = useNavigate()
  return (
    <div className="h-full relative flex flex-col items-center justify-center">
      <button 
        onClick={() => navigate(`/${param?.id}`)}
        className="absolute font-medium text-indigo-700 left-[20px] top-[20px]">
        back
      </button>
      <Info />
      <div className="flex pt-[50px]">
        <Enters />
        <Window />
      </div>
    </div>
  );
};

const Info = memo(() => {
  const [title, setTitle] = useState("");

  return (
    <div className="p-[15px] flex justify-between w-[950px] shadow-md rounded-lg bg-white">
      <div className="flex rounded-md shadow-sm">
        <span className="py-[3px] text-[18px] items-center justify-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-[15px] text-gray-500">
          Title
        </span>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          // onBlur={() => onHandleBlur("height", localHeight)}
          className="w-full px-[10px] focus:px-[9px] rounded-r-md border border-gray-300 outline-none focus:border-indigo-500 focus:border-[2px] focus:ring-indigo-500 sm:text-sm"
          type="text"
        />
      </div>
      <button className="bg-indigo-500 hover:bg-indigo-600 py-[3px] px-[12px] text-white font-[Nunito] text-[18px] rounded-md font-bold">
        preview
      </button>
    </div>
  );
});

const Enters = memo(() => {
  return (
    <div className="p-[15px] shadow-md w-[300px] rounded-lg bg-white">
      <span className="text-[20px] text-slate-800 font-bold font-[Nunito]">
        Enters
      </span>
    </div>
  );
});

const Window = memo(() => {
  return (
    <div className="p-[15px] shadow-md w-[600px] ml-[50px] rounded-lg bg-white">
      <span className="text-[20px] text-slate-800 font-bold font-[Nunito]">
        Preview
      </span>
    </div>
  );
});

export default Preview;
