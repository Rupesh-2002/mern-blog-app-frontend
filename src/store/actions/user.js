import { resetUserInfo } from "../reducers/userReducer"

export const logout = (dispatch)=>{
    dispatch(resetUserInfo())
    localStorage.removeItem('account')
}