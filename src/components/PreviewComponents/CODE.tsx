import { CopyBlock, github } from "react-code-blocks";
// utils
import generateCode from "../../utils/generateCode";

const CODE = () => {
  return (
    <div className="p-[15px] max-h-[250px] flex justify-between w-[950px] shadow-md rounded-lg bg-white">
      <CopyBlock
        text={generateCode}
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

export default CODE;
