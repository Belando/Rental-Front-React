//RDX
import { createSlice } from '@reduxjs/toolkit';

//COMPONENT
export const serieSlice = createSlice({
    name: 'serie',
    initialState: {
      choosen : {},
      series: []
    },
    reducers: {
      select: (state, action) => {
        return {
          ...state,
          ...action.payload}
      },
      find: (state, action) => {
        return {
          ...state,
          ...action.payload}
      },
      clear: (state, action) => {
        return {
          ...state,
          ...action.payload}
      }
    } 
})

//RDX ACTIONS
export const { select, find, clear } = serieSlice.actions;

//RDX STATE
export const serieData = (state) => state.serie;

//RDX REDUCER
export default serieSlice.reducer;