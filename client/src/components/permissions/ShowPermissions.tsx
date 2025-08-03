import React, { useState } from 'react'
import AddPermission from './AddPermission'
import { DefaultPermissionInterface, PermissionInterface, ShowPermissionContext } from './types'
import SuccessMsg from '../../Messages/SuccessMsg'
import DataPermissions from './DataPermissions'
import DeletePermission from './DeletePermission'
import EditPermission from './EditPermission'

const ShowPermissions:React.FC = () => {
  const [showSuccesMsg, setShowSuccesMsg] = useState(false)
  const [selectedPermission, setSelectedPermission] = useState<PermissionInterface>(DefaultPermissionInterface)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  
  return (
    <ShowPermissionContext.Provider value={{
      showSuccesMsg, setShowSuccesMsg,
      showEditModal, setShowEditModal,
      showDeleteModal, setShowDeleteModal,
      selectedPermission, setSelectedPermission,
    }}>
      {showSuccesMsg && <SuccessMsg modal={showSuccesMsg} toggle={() => setShowSuccesMsg(!showSuccesMsg)} /> }
      <AddPermission />
      <DataPermissions />
      {showDeleteModal && selectedPermission && <DeletePermission PermissionData={selectedPermission} modal={showDeleteModal} toggle={() => setShowDeleteModal(!showDeleteModal)} />}
      {showEditModal && selectedPermission && <EditPermission PermissionData={selectedPermission} modal={showEditModal} toggle={() => setShowEditModal(!showEditModal)}/>}
    </ShowPermissionContext.Provider>
  )
}

export default ShowPermissions
