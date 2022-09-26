import axios from "axios";
import { memo, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
//
// import imageToBase64 from "image-to-base64/browser";
// components
import API from "../components/PreviewComponents/API";
import CODE from "../components/PreviewComponents/CODE";
import Info from "../components/PreviewComponents/Info";
// hooks
import { useActions, useTypedSelector } from "../hooks";
import convertBase64 from "../utils/convertBase64";

const Preview = () => {
  // getters
  const { canvasWidth, canvasHeight } = useTypedSelector(
    (state) => state.canvas
  );
  // setters
  const {
    // canvas
    setTitle,
    setId,
    setElements,

    setCanvasWidth,
    setCanvasHeight,

    // preview
    setImage,
    setStatusImage,
  } = useActions();

  const [texts, setTexts] = useState([]);
  const [images, setImages] = useState([]);

  const [activeTab, setActiveTab] = useState({
    name: "api",
    component: <API />,
  });

  const onChangeActiveTab = (nameTab: string) => {
    if (nameTab === "api") {
      setActiveTab({
        name: "api",
        component: <API />,
      });
    }

    if (nameTab === "code") {
      setActiveTab({
        name: "code",
        component: <CODE />,
      });
    }
  };

  const param = useParams();

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(
          `http://localhost:3333/design/${param?.id}`
        );
        console.log(res);
        if (res.status === 200) {
          const parseElements: any = JSON.parse(res.data?.elements) ?? [];
          setElements(parseElements);
          setCanvasWidth(res.data?.canvasWidth);
          setCanvasHeight(res.data?.canvasHeight);
          setTitle(res.data?.title);
          setId(res.data?.id);

          setTexts(
            parseElements.filter(
              (el: any) => el._type === "text" && el.isReplace
            )
          );

          setImages(
            parseElements.filter(
              (el: any) => el._type === "dynamic_image" && el.isReplace
            )
          );
        }
      } catch (error) {}
    })();

    return () => {
      setImage(null);
      setStatusImage("idle");
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param?.id]);

  const onHandlePreview = async (
    designId: string,
    localTexts: any,
    localImages: any
  ) => {
    setImage(null);
    setStatusImage("loading");
    try {
      const res = await axios.post("http://localhost:3333/design/preview", {
        texts: localTexts,
        images: localImages,
        designId: Number(designId),
      });

      if (res.status === 201) {
        setImage(res.data);
        setStatusImage("success");
      }
    } catch (error) {
      setStatusImage("error");
    }
  };

  const navigate = useNavigate();
  return (
    <div className="h-full overflow-y-auto py-[30px] relative flex flex-col items-center">
      <button
        onClick={() => navigate(`/${param?.id}`)}
        className="fixed z-10 font-medium text-indigo-700 hover:text-indigo-900 left-[20px] top-[20px]"
      >
        back
      </button>
      <Info activeTab={activeTab} onChangeActiveTab={onChangeActiveTab} />
      <div className="flex flex-col pt-[30px]">
        {activeTab.component}
        <div className="flex pt-[40px]">
          <Enters
            onHandlePreview={onHandlePreview}
            designId={param?.id}
            texts={texts}
            images={images}
          />
          <Window canvasHeight={canvasHeight} canvasWidth={canvasWidth} />
        </div>
      </div>
    </div>
  );
};

type EntersProps = {
  texts: any;
  images: any;

  designId: string | undefined;

  onHandlePreview: any;
};
const Enters = memo(
  ({ texts, images, designId, onHandlePreview }: EntersProps) => {
    const [localTexts, setLocalTexts] = useState<any>({});
    const [localImages, setLocalImages] = useState<any>({});
    console.log(localImages);

    useEffect(() => {
      let newTexts = {};
      let newImages = {};

      texts.forEach((text: any) => {
        newTexts = {
          ...newTexts,
          [text.id]: {
            text: text.text,
            id: text.id,
            isReplace: text.isReplace,
          },
        };
      });

      images.forEach((image: any) => {
        newImages = {
          ...newImages,
          [image.id]: {
            base64: undefined,
            id: image.id,
            isReplace: image.isReplace,
          },
        };
      });

      setLocalTexts(newTexts);
      setLocalImages(newImages);
    }, [texts, images]);

    return (
      <div>
        <div className="p-[15px] max-h-[500px] overflow-y-auto shadow-md w-[300px] rounded-lg bg-white">
          <div className="flex flex-col">
            {texts.length > 0 && (
              <>
                <div className="w-full text-center">
                  <span className="text-[22px] text-slate-800 font-bold font-[Nunito]">
                    Text
                  </span>
                </div>
                <div className="flex flex-col">
                  {texts.map((text: any) => (
                    <Text
                      key={text.id}
                      id={text.id}
                      text={text.text}
                      setLocalTexts={setLocalTexts}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
          {images?.length > 0 && (
            <>
              <div
                style={{
                  paddingTop: texts.length > 0 ? "30px" : "0",
                }}
                className="w-full text-center"
              >
                <span className="text-[22px] text-slate-800 font-bold font-[Nunito]">
                  Image
                </span>
              </div>
              {images.map((image: any) => (
                <Image
                  key={image.id}
                  id={image.id}
                  setLocalImages={setLocalImages}
                />
              ))}
            </>
          )}
        </div>
        <button
          onClick={() => onHandlePreview(designId, localTexts, localImages)}
        >
          preview
        </button>
      </div>
    );
  }
);

type ImageProps = {
  id: string;
  setLocalImages: any;
};
const Image = memo(({ id, setLocalImages }: ImageProps) => {
  const onChangeImage = async (image: any) => {
    const base64 = await convertBase64(image);
    setLocalImages((prev: any) => {
      prev[id].base64 = base64;

      return prev;
    });
  };

  return (
    <div className="w-full">
      <label
        className="mb-[2px] mt-[7px] flex text-[17px] font-medium text-gray-900"
        htmlFor="small_size"
      >
        ID: <span className="truncate text-gray-700  ml-[10px]">{id}</span>
      </label>
      <input
        accept="image/*"
        onChange={(e: any) => onChangeImage(e.target.files[0])}
        className="block w-full text-sm text-gray-900 bg-gray-50 rounded-r-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        id="small_size"
        type="file"
      />
    </div>
  );
});

type TextProps = {
  text: string | undefined;
  id: string;

  setLocalTexts: any;
};
const Text = memo(({ text, id, setLocalTexts }: TextProps) => {
  const [localText, setLocalText] = useState<string | undefined>("");

  useEffect(() => {
    setLocalText(text);
  }, [text]);

  const onHandleBlur = () => {
    setLocalTexts((prev: any) => {
      prev[id].text = localText;

      return prev;
    });
  };

  return (
    <div className="flex mt-[10px] flex-col">
      <label
        className="mb-[4px] flex text-[17px] font-medium text-gray-900"
        htmlFor={id}
      >
        ID: <span className="truncate text-gray-700  ml-[10px]">{id}</span>
      </label>
      <input
        value={localText}
        onChange={(e) => setLocalText(e.target.value)}
        onBlur={onHandleBlur}
        className="outline-none border focus:border-[2px] focus:px-[9px] focus:py-[4px] px-[10px] py-[5px] w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        id={id}
        type="text"
      />
    </div>
  );
});

//

type WindowType = {
  canvasWidth: number;
  canvasHeight: number;
};
const Window = memo(({ canvasWidth, canvasHeight }: WindowType) => {
  // getters
  const { image, statusImage } = useTypedSelector((state) => state.preview);

  return (
    <div className="w-[600px] relative ml-[50px] flex justify-center">
      <span className="absolute top-[-25px] right-0 font-[Nunito] font-bold text-slate-600 text-[17px]">
        size: {canvasWidth}x{canvasHeight}
      </span>
      <div className="p-[25px] max-h-[500px] overflow-auto flex justify-center shadow-md max-w-[600px] rounded-lg bg-white">
        {/* <span className="text-[20px] text-slate-800 font-bold font-[Nunito]">
          Preview
        </span> */}
        {statusImage === "loading" && (
          <div
            className="flex items-center justify-center border-dashed border-2 border-indigo-600"
            style={{
              height: canvasHeight,
              width: canvasWidth,
            }}
          >
            <span className="bg-indigo-500 font-[Nunito] py-[3px] px-[12px] font-bold text-[19px] rounded-md text-white">
              loading...
            </span>
          </div>
        )}
        {statusImage === "success" && image && (
          <div
            style={{
              height: canvasHeight,
              width: canvasWidth,
            }}
            className="border-dashed border-2 border-indigo-600"
          >
            <img src={image} alt="canvasImg" />
          </div>
        )}
        {(statusImage === "error" || statusImage === "idle") && (
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
        )}
      </div>
    </div>
  );
});

export default Preview;
