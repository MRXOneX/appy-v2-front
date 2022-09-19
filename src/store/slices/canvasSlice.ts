import { createSlice } from "@reduxjs/toolkit";
// types
import { Element } from '../../utils/types'



type TInitialState = {
  canvas: any

  canvasWidth: number
  canvasHeight: number

  selectedElement: null | Element
  elements: Element[]
}


export const canvasSlice = createSlice({
  name: "canvas" as string,
  initialState: {
    canvas: null,

    canvasWidth: 300,
    canvasHeight: 500,

    selectedElement: null,
    elements: [
      {
        id: "1",
        name: '1',
        type: "rect",
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        fill: "blue",
      },
      {
        id: "2",
        name: '2',
        type: "rect",
        x: 110,
        y: 100,
        width: 100,
        height: 100,
        fill: "red",
      },

      {
        id: "3",
        name: '3',
        type: "text",
        x: 110,
        y: 100,
        width: 100,
        height: 100,

        fill: "red",

        fontSize: 20,
        fontFamily: 'Montserrat',
        fontStyle: 'normal',
        text: "texttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttext",
      },

      {
        id: "4",
        name: '4',
        type: "image",
        x: 110,
        y: 100,
        width: 100,
        height: 100,

        image: "https://konvajs.org/assets/lion.png",
      },
    ],
  } as TInitialState,
  reducers: {
    setCanvas: (state: TInitialState, action: any) => ({
      ...state,
      canvas: action.payload,
    }),

    setElements: (state: TInitialState, action: any) => ({
      ...state,
      elements: action.payload,
    }),

    setSelectedElement: (state: TInitialState, action: any) => ({
      ...state,
      selectedElement: action.payload,
    }),

    setCanvasWidth: (state: TInitialState, action: any) => ({
      ...state,
      canvasWidth: action.payload,
    }),
    setCanvasHeight: (state: TInitialState, action: any) => ({
      ...state,
      canvasHeight: action.payload,
    })
  } as any,
});

export const canvasReducer = canvasSlice.reducer;
export const canvasActions = canvasSlice.actions;
