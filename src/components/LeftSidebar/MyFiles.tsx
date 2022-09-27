import axios from "axios";
import { useEffect, useState } from "react";
//
import { v4 } from "uuid";
// hooks
import { useActions, useTypedSelector } from "../../hooks";
// utils
import convertBase64 from "../../utils/convertBase64";

const MyFiles = () => {
  const { design } = useTypedSelector((state) => state.canvas);

  const [file, setFile] = useState<any>(null);
  const [files, setFiles] = useState<any>([]);

  const onChangeFile = async (file: any) => {
    const image: any = await convertBase64(file);
    setFile({
      base64: image,
      name: `${v4()}_${file.name}`,
    });
  };

  const uploadFile = async () => {
    try {
      const res = await axios.post("http://localhost:3333/design/upload", {
        designId: design.id,
        file,
      });
      if (res.status === 201) {
        setFiles((prev: any) => [...prev, res.data]);
      }
    } catch (error) {}
  };

  useEffect(() => {
    setFiles(design.files);

    return () => {
      setFiles([]);
    };
  }, [design?.files]);

  // gettes
  const { canvasHeight, elements, canvasWidth } = useTypedSelector(
    (state) => state.canvas
  );
  // setters
  const { setSelectedElement, setElements } = useActions();

  const onHandleCreateIcon = (image: string): void => {
    const id = v4();
    const newElement: any = {
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
    <div className="flex flex-col pt-[25px]">
      <input
        onChange={(e: any) => onChangeFile(e.target.files[0])}
        accept="image/png, image/jpeg"
        type="file"
      />

      <button
        disabled={Boolean(!file)}
        onClick={uploadFile}
        className="btn btn-secondary btn-sm mt-[10px]"
      >
        upload image
      </button>

      <div className="grid mt-[20px] overflow-y-auto px-[10px] gap-3 grid-rows-2 pt-[10px] grid-cols-3">
        {files &&
          files?.length &&
          files.map((file: any) => (
            <div
              key={file.id}
              onClick={() => onHandleCreateIcon(file.url)}
              className="bg-teal-200 cursor-pointer hover:bg-teal-300  rounded-md w-[55px] p-[10px] h-[55px]"
            >
              <img
                src={file.url}
                className="w-full h-full object-contain"
                alt=""
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default MyFiles;
