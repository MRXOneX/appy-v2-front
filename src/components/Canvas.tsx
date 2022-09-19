import { memo } from "react";
import { Stage, Layer } from "react-konva";
import { useActions, useTypedSelector } from "../hooks";
// tools
import CustomImage from "./tools/CustomImage";
import CustomRect from "./tools/CustomRect";
import CustomText from "./tools/CustomText";

const Canvas = ({ elements }: any) => {
  // getters
  const {
    selectedElement,

    canvasWidth,
    canvasHeight,
  } = useTypedSelector((state) => state.canvas);

  // setters
  const { setElements, setSelectedElement } = useActions();

  const checkDeselect = (e: any) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      setSelectedElement(null);
    }
  };

  return (
    <div
      style={{
        width: "calc(100% - 560px)",
      }}
      className="h-full flex items-center justify-center"
    >
      <div
        style={{
          width: canvasWidth,
          height: canvasHeight,
        }}
        className="relative"
      >
        <Info />
        <Stage
          className="bg-white shadow-sm"
          width={canvasWidth}
          height={canvasHeight}
          onMouseDown={checkDeselect}
          onTouchStart={checkDeselect}
        >
          <Layer>
            {elements.map((elem: any, index: number) => {
              switch (elem.type) {
                case "rect":
                  return (
                    <CustomRect
                      key={elem.id}
                      shapeProps={elem}
                      isSelected={elem.id === selectedElement?.id}
                      onSelect={(shape: any) => {
                        setSelectedElement(shape);
                      }}
                      onChange={(newAttrs: any) => {
                        const elems = elements.slice();
                        elems[index] = newAttrs;
                        setSelectedElement(newAttrs);
                        setElements(elems);
                      }}
                    />
                  );
                case "text":
                  return (
                    <CustomText
                      key={elem.id}
                      shapeProps={elem}
                      isSelected={elem.id === selectedElement?.id}
                      onSelect={(shape: any) => {
                        setSelectedElement(shape);
                      }}
                      onChange={(newAttrs: any) => {
                        const elems = elements.slice();
                        elems[index] = newAttrs;
                        setSelectedElement(newAttrs);
                        setElements(elems);
                      }}
                    />
                  );
                case "image":
                  return (
                    <CustomImage
                      key={elem.id}
                      shapeProps={elem}
                      isSelected={elem.id === selectedElement?.id}
                      onSelect={(shape: any) => {
                        setSelectedElement(shape);
                      }}
                      onChange={(newAttrs: any) => {
                        const elems = elements.slice();
                        elems[index] = newAttrs;
                        setSelectedElement(newAttrs);
                        setElements(elems);
                      }}
                    />
                  );
                default:
                  return <></>;
              }
            })}
          </Layer>
        </Stage>
      </div>
    </div>
  );
};


const Info = memo(() => {
  const { canvasHeight, canvasWidth } = useTypedSelector(
    (state) => state.canvas
  );

  return (
    <div className="absolute flex w-full justify-end top-[-25px]">
      <span className="text-slate-500">
        {canvasHeight}x{canvasWidth}
      </span>
    </div>
  );
});

export default memo(Canvas);
