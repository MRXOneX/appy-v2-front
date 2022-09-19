import { configureStore } from '@reduxjs/toolkit'

// reducers
import { canvasReducer } from './slices/canvasSlice'


export const store = configureStore({
    reducer: {
        canvas: canvasReducer
    }
})


export type TypeRootState = ReturnType<typeof store.getState>