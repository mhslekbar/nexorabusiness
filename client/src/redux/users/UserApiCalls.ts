import { Dispatch } from "react";
import { statusUserFailure, statusUserStart, statusUserSuccess } from "./userSlice";
import { get, post, put, remove } from "../../requestMethods";

export const ShowUserApi = () => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(statusUserStart())
    let response = await get(`user`)
    const resData = response.data.success
    if(resData) {
      dispatch(statusUserSuccess(resData))
      return true
    }
  } catch (error: any) {
    const errorData = error.response.data
    if(errorData && error.response.status === 300) {
      const formErrors = errorData.formErrors ?? [errorData]
      dispatch(statusUserFailure(formErrors))
      return formErrors
    } else {
      dispatch(statusUserFailure(errorData))
      return [errorData]
    }
  }
}

export const AddUserApi = (data: {}) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(statusUserStart())
    let response = await post(`user`, data)
    const resData =response.data.success
    if(resData) {
      dispatch(statusUserSuccess(resData))
      return true
    }
  } catch (error: any) {
    const errorData = error.response.data
    if(errorData && error.response.status === 300) {
      const formErrors = errorData.formErrors ?? [errorData]
      dispatch(statusUserFailure(formErrors))
      return formErrors
    } else {
      dispatch(statusUserFailure(errorData))
      return [errorData]
    }
  }
}

export const EditUserApi = (userId: string, data: {}) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(statusUserStart())
    let response = await put(`user/${userId}`, data)
    const resData =response.data.success
    if(resData) {
      dispatch(statusUserSuccess(resData))
      return true
    }
  } catch (error: any) {
    const errorData = error.response.data
    if(errorData && error.response.status === 300) {
      const formErrors = errorData.formErrors ?? [errorData]
      dispatch(statusUserFailure(formErrors))
      return formErrors
    } else {
      dispatch(statusUserFailure(errorData))
      return [errorData]
    }
  }
}

export const DeleteUserApi = (userId: string) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(statusUserStart())
    let response = await remove(`user/${userId}`)
    const resData =response.data.success
    if(resData) {
      dispatch(statusUserSuccess(resData))
      return true
    }
  } catch (error: any) {
    const errorData = error.response.data
    if(errorData && error.response.status === 300) {
      const formErrors = errorData.formErrors ?? [errorData]
      dispatch(statusUserFailure(formErrors))
      return formErrors
    } else {
      dispatch(statusUserFailure(errorData))
      return [errorData]
    }
  }
}

export const clearUserApi = async (dispatch: Dispatch<any>) => {
  dispatch(statusUserSuccess([]))
}
