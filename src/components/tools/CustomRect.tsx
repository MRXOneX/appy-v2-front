import { memo, useEffect, useRef } from "react";
//
import { Rect, Transformer } from "react-konva";

type CustomRectProps = {
  shapeProps: any;
  isSelected: boolean;
  onSelect: any;
  onChange: any;
};

const CustomRect = ({
  shapeProps,
  isSelected,
  onSelect,
  onChange,
}: CustomRectProps) => {
  const shapeRef: any = useRef(null);
  const trRef: any = useRef(null);

  useEffect(() => {
    if (isSelected) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <Rect
        onClick={() => onSelect(shapeProps)}
        onTap={() => onSelect(shapeProps)}
        ref={shapeRef}
        {...shapeProps}
        draggable
        onDragMove={(e: any) => {
          onSelect({
            ...shapeProps,
            x: Math.round(e.target.x()),
            y: Math.round(e.target.y()),
          });
        }}
        onDragEnd={(e: any) => {
          onChange({
            ...shapeProps,
            x: Math.round(e.target.x()),
            y: Math.round(e.target.y()),
          });
        }}
        onTransformEnd={(e) => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...shapeProps,
            x: Math.round(node.x()),
            y: Math.round(node.y()),
            // set minimal value
            width: Math.round(Math.max(5, node.width() * scaleX)),
            height: Math.round(Math.max(node.height() * scaleY)),
          });
        }}
      />
      {isSelected && (
        <Transformer
          anchorCornerRadius={2}
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }

            return newBox;
          }}
        />
      )}
    </>
  );
};

export default memo(CustomRect);
