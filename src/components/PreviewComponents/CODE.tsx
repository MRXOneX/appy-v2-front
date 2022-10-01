import { useState } from "react";
//
import { CopyBlock, github } from "react-code-blocks";
import { useTypedSelector } from "../../hooks";
// utils
import generateCode from "../../utils/generateCode";

const CODE = () => {
  const [activeTab, setActiveTab] = useState({
    name: "canvas",
    component: <Canvas />,
  });

  return (
    <div>
      <div className="tabs ml-[10px]">
        <button
          onClick={() =>
            setActiveTab({
              name: "canvas",
              component: <Canvas />,
            })
          }
          className={`tab tab-lifted ${
            activeTab.name === "canvas" ? "tab-active" : ""
          }`}
        >
          CANVAS
        </button>
        <button
          onClick={() =>
            setActiveTab({
              name: "html",
              component: <Html />,
            })
          }
          className={`tab tab-lifted ${
            activeTab.name === "html" ? "tab-active" : ""
          }`}
        >
          HTML
        </button>
      </div>
      <div className="p-[15px] max-h-[250px] flex flex-col justify-between w-[950px] shadow-md rounded-lg bg-white">
        {activeTab.component}
      </div>
    </div>
  );
};

const Canvas = () => {
  return (
    <CopyBlock
      text={"canvas"}
      language={"JavaScript"}
      showLineNumbers={555}
      theme={github}
      codeBlock
      customStyle={{
        width: "100%",
        overflow: "auto",
      }}
    />
  );
};

const Html = () => {
  const { canvasWidth, canvasHeight, elements } = useTypedSelector(
    (state) => state.canvas
  );

  const generateHtml = () => {
    const html = `// inline style
      <div style="width: ${canvasWidth}; height: ${canvasHeight}; background: white;">
        ${elements.map((element) => `<div>${element.text}</div>`)}
      </div>
    `;

    return html;
  };

  return (
    <CopyBlock
      text={"html"}
      language={"JavaScript"}
      showLineNumbers={555}
      theme={github}
      codeBlock
      customStyle={{
        width: "100%",
        overflow: "auto",
      }}
    />
  );
};

export default CODE;
