import { CopyBlock, github } from "react-code-blocks";


const API = () => {
  return (
    <div className="p-[15px] max-h-[250px] flex justify-between w-[950px] shadow-md rounded-lg bg-white">
      <CopyBlock
        text={"axios fetch"}
        language={"JavaScript"}
        showLineNumbers={555}
        theme={github}
        codeBlock
        customStyle={{
          width: "100%",
          overflow: 'auto'
        }}
      />
    </div>
  );
};

export default API;
