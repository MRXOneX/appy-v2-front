// hooks
import { useTypedSelector, useActions } from "../hooks";
// icons
import Logo from "../utils/svg/logo_appy.svg";
import Delete from "../utils/svg/icon_delete.svg";

const Navbar = () => {
  // getters
  const { selectedElement, elements }: any = useTypedSelector((state) => state.canvas);

  // setters
  const { setElements, setSelectedElement } = useActions();

  const onHandleDelete = () => {
    setElements(elements.filter((el: any) => el.id !== selectedElement.id))
    setSelectedElement(null)
  }

  return (
    <div className="h-[55px] flex items-center justify-between border border-neutral-200  bg-white">
      <div className="w-[280px] flex justify-center">
        <img height={35} width={35} src={Logo} alt="logo" />
      </div>
      <div
        style={{
          width: "calc(100% - 560px)",
        }}
        className="flex"
      >
        <div className="flex">
          <button className="bg-cyan-100">
            undo
          </button>
          <button className="ml-[10px] bg-cyan-100">
            redo
          </button>

          <input 
            value="Test file"
            className="border focus:border-[2px] focus:px-[6px] focus:py-[1px] outline-none focus:border-indigo-500 border-gray-300 px-[7px] py-[2px] rounded-md"
            type="text" 
          />
        </div>
        {selectedElement && (
          <button 
              onClick={onHandleDelete}
              className="bg-cyan-100 flex hover:bg-cyan-200 rounded-md p-[5px]">
            <img width={25} height={25} src={Delete} alt="del" />
          </button>
        )}
      </div>
      <div className="w-[280px] flex justify-center">
        <span className="font-medium text-[22px]">MENU</span>
      </div>
    </div>
  );
};

export default Navbar;
