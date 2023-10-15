import {configureStore} from '@reduxjs/toolkit'
import modalReducer from '@/redux/features/modalSlice'

export const store = configureStore({
  reducer: {
    modalSLice: modalReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch