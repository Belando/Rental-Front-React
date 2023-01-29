//RDX
import { createSlice } from '@reduxjs/toolkit';

//COMPONENT
export const userSlice = createSlice({
    name: 'user',
    initialState: {
      userPass: {
        token: '',
        user: {}
      }
    },
    reducers: {
      login: (state, action) => {
        return {
          ...state,
          ...action.payload}
      },
      logout: (state, action) => {
        return {
          ...state,
          ...action.payload}
      },
      modify: (state, action) => {
        return {
          ...state,
          ...action.payload}
      }
    }
})

//RDX ACTIONS
export const { login, logout, modify } = userSlice.actions;

//RDX STATE
export const userData = (state) => state.user;

//RDX REDUCER
export default userSlice.reducer;