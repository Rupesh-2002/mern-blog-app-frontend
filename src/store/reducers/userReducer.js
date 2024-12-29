import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userInfo : null
}

export const counterSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload
    },
    resetUserInfo : (state)=>{
      state.userInfo = null
    }
   
  },
})

export const { setUserInfo, resetUserInfo } = counterSlice.actions

export default counterSlice.reducer