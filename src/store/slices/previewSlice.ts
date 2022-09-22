import { createSlice } from "@reduxjs/toolkit";
// types
import { Element } from "../../utils/types";

type TInitialState = {};

export const previewSlice = createSlice({
  name: "preview" as string,
  initialState: {
    image: null,
    statusImage: 'idle' as 'idle' | 'loading' | 'success' | 'error'
  } as any,
  reducers: {
    setImage: (state: any, action: any) => ({
      ...state,
      image: action.payload,
    }),

    setStatusImage: (state: any, action: any) => ({
        ...state,
        statusImage: action.payload,
    })
  } as any,
});

export const previewReducer = previewSlice.reducer;
export const previewActions = previewSlice.actions;
