import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/userReducer'

// let userInfoFromLocalStorage = null
// if(localStorage.getItem('account') !== undefined){
//   userInfoFromLocalStorage = JSON.parse(localStorage.getItem('account'))
// }
const userInfoFromLocalStorage = localStorage.getItem('account') ? JSON.parse(localStorage.getItem('account')) : null
const initialState = {
    user : {userInfo : userInfoFromLocalStorage}
}

export const store = configureStore({
  reducer: {user : userReducer},
  preloadedState : initialState
})