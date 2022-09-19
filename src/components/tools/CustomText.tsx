import { memo, useEffect, useRef } from "react";
//
import { Text, Transformer } from "react-konva";

type CustomTextProps = {
  shapeProps: any;
  isSelected: boolean;
  onSelect: any;
  onChange: any;
};

const CustomText = ({
  shapeProps,
  isSelected,
  onSelect,
  onChange,
}: CustomTextProps) => {
  const shapeRef: any = useRef();
  const trRef: any = useRef();

  useEffect(() => {
    if (isSelected) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <Text
        {...shapeProps}
        draggable
        ref={shapeRef}
        onClick={() => onSelect(shapeProps)}
        onTap={() => onSelect(shapeProps)}
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
        onTransform={(e) => {
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

export default memo(CustomText);
