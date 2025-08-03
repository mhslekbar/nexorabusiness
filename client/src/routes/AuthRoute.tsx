import React from 'react'
import { useSelector } from 'react-redux'
import { State } from '../redux/store'
import NotAuthorized from '../pages/NotAuthorized'
import { PermissionType } from '../components/roles/types'

interface props {
  permName?: string,
  collectionName: string,
  element: any
}

const AuthRoute = ({ permName = "AFFICHER", collectionName, element }: props) => {
  const { permissions } = useSelector((state: State) => state.permissions)

  return (
    <>
      {permissions.find(
        (permission: PermissionType) =>
          permission.name === permName &&
          permission.collectionName === collectionName
      ) ? element : <NotAuthorized />}
    </>
  )
}

export default AuthRoute