import { useEffect, useRef, useState } from "react";
import { useTypedSelector } from "../../hooks";

const Layers = () => {
  const { elements } = useTypedSelector((state: any) => state.canvas);

  return (
    <div className="flex h-full overflow-y-auto flex-col pt-[5px]">
      {elements.map((element: any) => (
        <Layer key={element.id} element={element} />
      ))}
    </div>
  );
};

type LayerProps = {
  element: any;
};

const Layer = ({ element }: LayerProps) => {
  const [isChange, setIsChange] = useState<boolean>(false);
  const [localName, setLocalName] = useState('')

//   let refName = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setLocalName(element.name)
  }, [element?.name])

  return (
    <div className="border hover:border-indigo-500 flex items-center border-gray-300 mt-[10px] rounded-[10px] p-[10px]">
      <div className="w-[20px] h-[20px] bg-[blue]" />
      {isChange ? (
        <input
          style={{
            width: "calc(100% - 30px)",
          }}
        //   ref={refName}
          value={localName}
          onChange={(e) => setLocalName(e.target.value)}
          onKeyUp={(e) => e.code === "Enter" && setIsChange(false)}
          onBlur={() => setIsChange(false)}
          className=" ml-[10px] px-[10px] rounded-md border border-gray-300 outline-none focus:border-indigo-500 focus:border-[2px] focus:ring-indigo-500 sm:text-sm"
        />
      ) : (
        <span 
        style={{
            width: "calc(100% - 30px)",
  
        }}
        onDoubleClick={() => {
            // refName.current?.focus()
            setIsChange(true)
        }} className="ml-[10px] truncate">
          {element.name}
        </span>
      )}
    </div>
  );
};

export default Layers;
