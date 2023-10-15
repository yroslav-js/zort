import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'

interface IInitialState {
  isModalOpen: boolean
}

const initialState: IInitialState = {
  isModalOpen: false,
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setIsModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isModalOpen = action.payload
    },
  }
})

export const {
  setIsModalOpen,
} = modalSlice.actions

export default modalSlice.reducer