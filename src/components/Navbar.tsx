import { useNavigate, useParams } from "react-router";
import axios from "axios";
// hooks
import { useTypedSelector, useActions } from "../hooks";
// icons
import Logo from "../utils/svg/logo_appy.svg";
import Delete from "../utils/svg/icon_delete.svg";
import Save from "../utils/svg/save.svg";
import window from "../utils/svg/window.svg";

const Navbar = () => {


  const { id } = useParams()
  // getters
  const { design, canvasWidth, canvasHeight, selectedElement, elements }: any = useTypedSelector(
    (state) => state.canvas
  );

  // setters
  const { setElements, setSelectedElement, setDesign } = useActions();

  const onHandleDelete = () => {
    setElements(elements.filter((el: any) => el.id !== selectedElement.id));
    setSelectedElement(null);
  };

  const onHandleSave = async () => {
    try {
      const res = await axios.post(`${process.env.api_back}/design/save`, {
        designId: Number(id),
        elements: JSON.stringify(elements),
        canvasWidth,
        canvasHeight,
        typeFile: design.typeFile
      });
    } catch (error) {}
  };

  const navigate = useNavigate();
  return (
    <div className="min-h-[50px] flex items-center justify-between border border-neutral-200  bg-white">
      <div className="w-[280px] flex justify-center">
        <img
          className="cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
          height={35}
          width={35}
          src={Logo}
          alt="logo"
        />
      </div>
      <div
        style={{
          width: "calc(100% - 560px)",
        }}
        className="flex justify-between"
      >
        <div className="flex">
          {/* <button className="bg-cyan-100">undo</button>
          <button className="ml-[10px] bg-cyan-100">redo</button> */}

          <input
            value={design?.title}
            className="border focus:border-[2px] focus:px-[6px] focus:py-[1px] outline-none focus:border-indigo-500 border-gray-300 px-[7px] py-[2px] rounded-md"
            type="text"
          />
        </div>
        {selectedElement && (
          <button
            onClick={onHandleDelete}
            className="bg-cyan-100 flex hover:bg-cyan-200 rounded-md p-[5px]"
          >
            <img width={25} height={25} src={Delete} alt="del" />
          </button>
        )}
        <div className="flex items-center">
        <select onChange={e => setDesign({...design, typeFile: e.target.value})} className="select select-bordered w-full select-sm">
          <option selected={design?.typeFile === 'jpg'}>
            jpg
          </option>
          <option  selected={design?.typeFile === 'png'}>
            png
          </option>
          <option  selected={design?.typeFile === 'pdf'}>
            pdf
          </option>
        </select>
        </div>
      </div>
      <div className="w-[280px] flex justify-around">
        <button
          onClick={() => navigate(`/preview/${id}`)}
          className="ml-5 rounded-md border border-gray-300 bg-white py-[4px] px-3 text-sm font-medium  text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          PREVIEW
        </button>
        <button
          onClick={onHandleSave}
          className="ml-5 rounded-md border border-gray-300 bg-white py-[4px] px-3 text-sm font-medium  text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          SAVE
        </button>
      </div>
    </div>
  );
};

export default Navbar;
