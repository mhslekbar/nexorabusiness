import React, { createContext, useEffect, useState } from 'react'
import { DefaultShowUserType, DefaultUserInterface, ShowUserType, UserInterface } from './types'
import AddUser from './AddUser'
import TableUsers from './TableUsers'
import { useSelector } from 'react-redux'
import { State } from '../../redux/store'
import { useDispatch } from 'react-redux'
import { ShowUserApi } from "../../redux/users/UserApiCalls"
import SuccessMsg from '../../Messages/SuccessMsg'
import EditUser from './EditUser'
import DeleteUser from './DeleteUser'
import { showRolesApi } from '../../redux/roles/roleApiCalls'

export const ShowUserContext = createContext<ShowUserType>(DefaultShowUserType)

const ShowUsers:React.FC = () => {
  const { users } = useSelector((state: State) => state.users)
  const [successMsg, setSuccessMsg] = useState<boolean>(false) 
  const [showEditModal, setShowEditModal] = useState<boolean>(false) 
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false) 
  const [selectedUser, setSelectedUser] = useState<UserInterface>(DefaultUserInterface) 
  const dispatch: any = useDispatch()

  useEffect(() => {
    const callAPis = async () => {
      try {
        await dispatch(ShowUserApi())
        await dispatch(showRolesApi())
      } catch {}
    }
    callAPis()
  }, [dispatch])


  return (
    <ShowUserContext.Provider value={{ successMsg, setSuccessMsg,
      showEditModal, setShowEditModal,
      showDeleteModal, setShowDeleteModal,
      selectedUser, setSelectedUser
    }}>
      {successMsg && <SuccessMsg modal={successMsg} toggle={() =>setSuccessMsg(!successMsg)} />}
      <AddUser />
      {showEditModal && selectedUser && <EditUser modal={showEditModal} toggle={() => setShowEditModal(!showEditModal)} user={selectedUser} />}
      {showDeleteModal && selectedUser && <DeleteUser modal={showDeleteModal} toggle={() => setShowDeleteModal(!showDeleteModal)} user={selectedUser} />}
      {users.length > 0 && <TableUsers users={users}/> }
    </ShowUserContext.Provider>
  )
}

export default ShowUsers
