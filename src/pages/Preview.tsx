import { memo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useTypedSelector } from "../hooks";

const Preview = () => {
  // getters
  const { canvasWidth, canvasHeight } = useTypedSelector(
    (state) => state.canvas
  );

  const param = useParams();

  const navigate = useNavigate();
  return (
    <div className="h-full relative flex flex-col items-center justify-center">
      <button
        onClick={() => navigate(`/${param?.id}`)}
        className="absolute font-medium text-indigo-700 hover:text-indigo-900 left-[20px] top-[20px]"
      >
        back
      </button>
      <Info />
      <div className="flex pt-[50px]">
        <Enters />
        <Window canvasHeight={canvasHeight} canvasWidth={canvasWidth} />
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
    <div>
      <div className="p-[15px] shadow-md w-[300px] rounded-lg bg-white">
        <div className="flex flex-col">
          <div className="w-full text-center">
            <span className="text-[20px] text-slate-800 font-bold font-[Nunito]">
              Text
            </span>
          </div>
          <div className="flex flex-col">
            <label
              className="mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              htmlFor="test"
            >
              text
            </label>
            <input
              className="outline-none border focus:border-[2px] focus:px-[9px] focus:py-[4px] px-[10px] py-[5px] w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              id="test"
              type="text"
            />
          </div>
        </div>
        <div className="w-full pt-[30px] text-center">
          <span className="text-[20px] text-slate-800 font-bold font-[Nunito]">
            Image
          </span>
        </div>
        <label
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          htmlFor="small_size"
        >
          Small file input
        </label>
        <input
          className="block w-full text-sm text-gray-900 bg-gray-50 rounded-r-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          id="small_size"
          type="file"
        />
      </div>
    </div>
  );
});

type WindowType = {
  canvasWidth: number;
  canvasHeight: number;
};
const Window = memo(({ canvasWidth, canvasHeight }: WindowType) => {
  return (
    <div>
      <div className="p-[25px] overflow-auto flex items-center justify-center shadow-md w-[600px] ml-[50px] rounded-lg bg-white">
        {/* <span className="text-[20px] text-slate-800 font-bold font-[Nunito]">
          Preview
        </span> */}
        <div
          style={{
            width: canvasWidth,
            height: canvasHeight,
          }}
          className="border-dashed flex items-center justify-center border-2 border-indigo-600"
        >
          <span className="font-bold text-indigo-600 font-[Nunito] text-[24px]">
            Your image
          </span>
        </div>
      </div>
    </div>
  );
});

export default Preview;
