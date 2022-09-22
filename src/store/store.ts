import { configureStore } from '@reduxjs/toolkit'

// reducers
import { canvasReducer } from './slices/canvasSlice'
import { previewReducer } from './slices/previewSlice'


export const store = configureStore({
    reducer: {
        canvas: canvasReducer,
        preview: previewReducer
    }
})


export type TypeRootState = ReturnType<typeof store.getState>