import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router";
import { Canvas, LeftSidebar, Navbar, RightSidebar } from "../components";
import { useActions, useTypedSelector } from "../hooks";
import socket from "../socket";

const Design = () => {
  // getters
  const { id, elements } = useTypedSelector((state) => state.canvas);

  // setters
  const {
    setId,
    setTitle,

    setElements,

    setCanvasWidth,
    setCanvasHeight,
  } = useActions();

  const param: any = useParams();

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(
          `http://localhost:3333/design/${param?.id}`
        );
        console.log(res);
        if (res.status === 200) {
          setElements(res.data?.elements ?? []);
          setCanvasWidth(res.data?.canvasWidth);
          setCanvasHeight(res.data?.canvasHeight);
          setTitle(res.data?.title);
          setId(res.data?.id);
        }
      } catch (error) {}
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param?.id]);

  useEffect(() => {
    if (id) {
      socket.on("changeCanvasWidthClient", (data) => {
        if (id === data.id) {
          setCanvasWidth(data.canvasWidth);
        }
      });

      socket.on("changeCanvasHeightClient", (data) => {
        if (id === data.id) {
          setCanvasHeight(data.canvasHeight);
        }
      });

      return () => {
        socket.off("changeCanvasWidthClient");
        socket.off("changeCanvasHeightClient");
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col h-full">
      <Navbar />
      <div className="flex justify-between h-full w-full">
        <LeftSidebar />
        <Canvas elements={elements} />
        <RightSidebar />
      </div>
    </div>
  );
};

export default Design;
