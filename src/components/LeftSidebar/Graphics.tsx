import shortid from "shortid";
//
import { useActions, useTypedSelector } from "../../hooks";
// types
import { Element } from "../../utils/types";

const Graphics = () => {
  return (
    <div className="flex h-full flex-col px-[10px] pt-[10px]">
      <BasicShapes />
      <Text />
      <Icons />
      <DynamicImage />
      <Other />
    </div>
  );
};

const Other = () => {

 // getters
 const {
  elements,

  canvasHeight,
  canvasWidth,
} = useTypedSelector((state) => state.canvas);

// setters
const { setSelectedElement, setElements } = useActions();

const onHandleCreateQRcode = (image: string): void => {
  const id = shortid.generate();
  const newElement: Element = {
    x: Math.round(canvasWidth / 3),
    y: Math.round(canvasHeight / 3),
    width: 100,
    height: 100,
    type: "image",
    _type: "qrcode",
    image: {
      url: image,
      isURL: true,
    },
    id: id,
    name: `qrcode-${id}`,
    isReplace: true,
  };
  setElements([...elements, newElement]);
  setSelectedElement(newElement);
};


  return (
    <div className="flex mt-[25px] pb-[150px] flex-col">
      <div className="flex items-center justify-between">
        <span className="text-[18px] text-slate-800 font-medium">Other</span>
        <button className="text-md font-medium text-indigo-600 hover:text-indigo-500">
          more
        </button>
      </div>
      <div className="grid gap-3 grid-rows-1 pt-[10px] grid-cols-4">
        <div
          onClick={() => onHandleCreateQRcode("https://i.imgur.com/f0GVtmv.png")}
          className="bg-teal-200 cursor-pointer hover:bg-teal-300 p-[5px] rounded-md w-[45px] h-[45px]"
        >
          <img src="https://i.imgur.com/f0GVtmv.png" alt="like" />
        </div>
      </div>
    </div>
  );
};

const DynamicImage = () => {
  // getters
  const {
    elements,

    canvasHeight,
    canvasWidth,
  } = useTypedSelector((state) => state.canvas);

  // setters
  const { setSelectedElement, setElements } = useActions();

  const onHandleCreateDynImage = () => {
    const id = shortid.generate();
    const newElement: Element = {
      x: Math.round(canvasWidth / 3),
      y: Math.round(canvasHeight / 3),
      width: 100,
      height: 100,
      type: "rect",
      _type: "dynamic_image",
      fit: "contain",
      pos: "centre",
      id: id,
      name: `dynamic_image-${id}`,
      stroke: "blue",
      isReplace: true,
    };
    setElements([...elements, newElement]);
    setSelectedElement(newElement);
  };
  return (
    <div className="flex mt-[25px] flex-col">
      <div className="flex items-center justify-between">
        <span className="text-[18px] text-slate-800 font-medium">
          Dynamic Image
        </span>
        <button className="text-md font-medium text-indigo-600 hover:text-indigo-500">
          more
        </button>
      </div>
      <div className="grid gap-3 grid-rows-1 pt-[10px] grid-cols-4">
        <div
          onClick={onHandleCreateDynImage}
          className="bg-teal-200 cursor-pointer hover:bg-teal-300  rounded-md w-[45px] p-[10px] h-[45px]"
        >
          <div className=" w-full h-full border-[2px] border-dashed border-indigo-500" />
        </div>
        <div className="bg-teal-200 cursor-pointer hover:bg-teal-300  rounded-md w-[45px] h-[45px]" />
      </div>
    </div>
  );
};

const Icons = () => {
  // getters
  const {
    elements,

    canvasHeight,
    canvasWidth,
  } = useTypedSelector((state) => state.canvas);

  // setters
  const { setSelectedElement, setElements } = useActions();

  const onHandleCreateIcon = (image: string): void => {
    const id = shortid.generate();
    const newElement: Element = {
      x: Math.round(canvasWidth / 3),
      y: Math.round(canvasHeight / 3),
      width: 100,
      height: 100,
      type: "image",
      _type: "image",
      image: {
        url: image,
        isURL: true,
      },
      id: id,
      name: `image-${id}`,
      isReplace: false,
    };
    setElements([...elements, newElement]);
    setSelectedElement(newElement);
  };

  return (
    <div className="flex mt-[25px] flex-col">
      <div className="flex items-center justify-between">
        <span className="text-[18px] text-slate-800 font-medium">Icons</span>
        <button className="text-md font-medium text-indigo-600 hover:text-indigo-500">
          more
        </button>
      </div>
      <div className="grid gap-3 grid-rows-1 pt-[10px] grid-cols-4">
        <div
          onClick={() => onHandleCreateIcon("https://i.imgur.com/RKDlh1y.png")}
          className="bg-teal-200 cursor-pointer hover:bg-teal-300 p-[5px] rounded-md w-[45px] h-[45px]"
        >
          <img src="https://i.imgur.com/RKDlh1y.png" alt="like" />
        </div>
        <div
          onClick={() => onHandleCreateIcon("https://i.imgur.com/ju4gYV6.png")}
          className="bg-teal-200 cursor-pointer hover:bg-teal-300 p-[5px] rounded-md w-[45px] h-[45px]"
        >
          <img src="https://i.imgur.com/ju4gYV6.png" alt="smile" />
        </div>
      </div>
    </div>
  );
};

const Text = () => {
  // getters
  const {
    elements,

    canvasHeight,
    canvasWidth,
  } = useTypedSelector((state) => state.canvas);

  // setters
  const { setSelectedElement, setElements } = useActions();

  const onHandleCreateText = (text: string, size: number): void => {
    const id = shortid.generate();
    const newElement: Element = {
      isReplace: false,
      x: Math.round(canvasWidth / 3),
      y: Math.round(canvasHeight / 3),
      width: 100,
      height: 100,
      type: "text",
      _type: "text",
      id: id,
      name: `text-${id}`,
      fill: "black",
      text: text,
      fontSize: size,
    };
    setElements([...elements, newElement]);
    setSelectedElement(newElement);
  };

  return (
    <div className="flex mt-[25px] flex-col">
      <div className="flex items-center justify-between">
        <span className="text-[18px] text-slate-800 font-medium">Text</span>
        <button className="text-md font-medium text-indigo-600 hover:text-indigo-500">
          more
        </button>
      </div>
      <div className="flex flex-col pt-[10px]">
        <div
          onClick={() => onHandleCreateText("Add a title", 40)}
          className="bg-teal-200 hover:shadow-md py-[4px] px-[10px] cursor-pointer hover:bg-teal-300  rounded-md w-full"
        >
          <span className="text-[26px]">Add a title</span>
        </div>
        <div
          onClick={() => onHandleCreateText("Add a subtitle", 30)}
          className="bg-teal-200 mt-[10px] hover:shadow-md py-[4px] px-[10px] cursor-pointer hover:bg-teal-300  rounded-md w-full"
        >
          <span className="text-[20px]">Add a subtitle</span>
        </div>
        <div
          onClick={() => onHandleCreateText("Add main text", 20)}
          className="bg-teal-200 mt-[10px] hover:shadow-md py-[4px] px-[10px] cursor-pointer hover:bg-teal-300  rounded-md w-full"
        >
          <span className="text-[16px]">Add main text</span>
        </div>
      </div>
    </div>
  );
};

const BasicShapes = () => {
  // getters
  const {
    elements,

    canvasHeight,
    canvasWidth,
  } = useTypedSelector((state) => state.canvas);

  // setters
  const { setSelectedElement, setElements } = useActions();

  const onHandleCreateRect = () => {
    const id = shortid.generate();
    const newElement: Element = {
      x: Math.round(canvasWidth / 3),
      y: Math.round(canvasHeight / 3),
      width: 100,
      height: 100,
      type: "rect",
      _type: "rect",
      id: id,
      name: `rect-${id}`,
      fill: "black",
    };
    setElements([...elements, newElement]);
    setSelectedElement(newElement);
  };
  // const onHandleCreateCircle = () => {
  //     const id = v4()
  //     const newElement: Element = {
  //         x: Math.round(canvasWidth / 3),
  //         y: Math.round(canvasHeight / 3),
  //         width: 100,
  //         height: 100,
  //         type: 'circle',
  //         id: id,
  //         name: `rect-${id}`,
  //         fill: 'black'
  //     }
  //     setElements([...elements, newElement])
  //     setSelectedElement(newElement)
  // }

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <span className="text-[18px] text-slate-800 font-medium">
          Basic shapes
        </span>
        <button className="text-md font-medium text-indigo-600 hover:text-indigo-500">
          more
        </button>
      </div>
      <div className="grid gap-3 grid-rows-1 pt-[10px] grid-cols-4">
        <div
          onClick={onHandleCreateRect}
          className="bg-teal-200 cursor-pointer hover:bg-teal-300 rounded-md w-[45px] p-[10px] h-[45px]"
        >
          <div className="bg-black w-full h-full" />
        </div>
        <div
          //   onClick={onHandleCreateCircle}
          className="bg-teal-200 cursor-pointer hover:bg-teal-300  rounded-md w-[45px] p-[10px] h-[45px]"
        >
          <div className="bg-black w-full h-full rounded-full" />
        </div>
        {/* <div className="bg-teal-200 cursor-pointer hover:bg-teal-300  rounded-md w-[45px] p-[10px] h-[45px]">
          <div className=" w-full h-full border-[2px] border-dashed border-indigo-500" />
        </div> */}
      </div>
    </div>
  );
};

export default Graphics;
