import React, { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { State } from '../../redux/store'
import { useDispatch } from 'react-redux'
import { ShowPermissionApi } from '../../redux/permissions/permissionApiCalls'
import { MdRemoveCircle } from 'react-icons/md'
import { PermissionInterface, ShowPermissionContext } from './types'
import { FaEdit } from 'react-icons/fa'

const DataPermissions:React.FC = () => {
  const { permissions } = useSelector((state: State) => state.permissions)
  const dispatch: any = useDispatch()

  useEffect(() => {
    const fetchPermission = async () => {
      await dispatch(ShowPermissionApi())
    }
    fetchPermission()
  }, [dispatch])

  const [groupedPermission, setGroupedPermission] = useState<any[]>([])

  useEffect(() => {
    const groupPermissionByColumn = (permissions: any, column: any) => {
      return permissions.reduce((groupedData: any, item: any) => {
        const key = item[column];
        if (!groupedData[key]) {
          groupedData[key] = [];
        }
        groupedData[key].push(item);
        return groupedData;
      }, {});
    }
    setGroupedPermission(groupPermissionByColumn(permissions, "collectionName"))
  }, [permissions])

  const { showEditModal, setShowEditModal, showDeleteModal, setShowDeleteModal, setSelectedPermission } = useContext(ShowPermissionContext)

  const handleDeletePermission = (permission: PermissionInterface) => {
    setShowDeleteModal(!showDeleteModal)
    setSelectedPermission(permission)
  }

  const handleEditPermission = (permission: PermissionInterface) => {
    setShowEditModal(!showEditModal)
    setSelectedPermission(permission)
  }

  return (
    <div className='mt-2'>
    {
      Object.keys(groupedPermission).map((group: any, index: number) => (
        <React.Fragment key={index}>
          <p className='bg-white px-4 py-2 w-1/2'>
            {group}
          </p>
          <section className='w-1/2' style={{ paddingLeft: "10px" }}>
            {groupedPermission[group].map((perm: any, indx: number) => 
              <p className='rounded shadow bg-[#EEE] px-4 py-2 border-b flex justify-between' key={indx}>
                {perm.name}
                <span className='flex gap-1'>
                  <FaEdit onClick={() => handleEditPermission(perm)} className='text-blue' style={{ fontSize: "22px" }} />
                  <MdRemoveCircle onClick={() => handleDeletePermission(perm)} className='text-red' style={{ fontSize: "22px" }} />
                </span>
              </p>
            )}
          </section>
        </React.Fragment>
      ))
    }
    </div>
  )
}

export default DataPermissions

