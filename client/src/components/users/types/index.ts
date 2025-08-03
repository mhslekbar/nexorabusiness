import { createContext } from "react"
import { PermissionType } from "../../roles/types"

export const DefaultUserInterface = {
  _id: "",
  username: "",
  password: "",
  phone: "",
  roles: [],
  dev: false,
  store: "",
  createdAt: "",
  updatedAt: ""
}

export type ShowUserType = {
  successMsg: boolean,
  setSuccessMsg: (successMsg: boolean) => void,
  showEditModal: boolean, 
  setShowEditModal: (showEditModal: boolean) => void,
  showDeleteModal: boolean, 
  setShowDeleteModal: (showDeleteModal: boolean) => void,
  selectedUser: UserInterface,
  setSelectedUser: (selectedUser: UserInterface) => void
}

export const DefaultShowUserType = {
  successMsg: false,
  setSuccessMsg: () => {},
  showEditModal: false, 
  setShowEditModal: () => {},
  showDeleteModal: false, 
  setShowDeleteModal: () => {},
  selectedUser: DefaultUserInterface,
  setSelectedUser: () => {}
}

export interface UserInterface {
  _id: string,
  username: string,
  password: string,
  phone: string,
  roles: PermissionType[],
  dev: boolean,
  store: any,
  createdAt?: string,
  updatedAt?: string
}


export interface AddUserInterface {
  username: string, 
  setUsername: (username: string) => void,
  phone: string,
  setPhone: (phone: string) => void,
  password: string,
  setPassword: (password: string) => void,
  checkedRoles: PermissionType[],
  setCheckedRoles: (checkedRoles: PermissionType[]) => void,
}

export const AddUserContext = createContext<AddUserInterface>({
  username: "", 
  setUsername: () => {},
  phone: "",
  setPhone: () => {},
  password: "",
  setPassword: () => {},
  checkedRoles: [],
  setCheckedRoles: () => {},
})

