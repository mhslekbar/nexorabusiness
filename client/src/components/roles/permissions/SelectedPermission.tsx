import React, { useEffect, useState } from 'react'
import { ArrayRoleType, PermissionType } from '../types'

interface SelectedPermissionInterface {
  permission: PermissionType,
  role: ArrayRoleType
}

const SelectedPermission:React.FC<SelectedPermissionInterface> = ({ permission, role }) => {
  const [selectedPerm, setSelectedPerm] = useState(false);
  const [updatedPerm, setUpdatedPerm] = useState(false)
  const [updatedRole, setUpdatedRole] = useState<ArrayRoleType>(role);

  useEffect(() => {
    !updatedPerm && setSelectedPerm(role.permissions.some(p => p._id.toString() === permission._id.toString()))
  }, [role.permissions, permission._id, updatedPerm])

  const handlePermissions = (e: any, permId: string, permObj: PermissionType) => {
    let updatedRolePermissions:PermissionType[] = updatedRole.permissions?.filter((perm) => perm._id !== permId);
    if (e.target.checked) {
      updatedRolePermissions.push(permObj);
    }
    const newUpdatedRole = {...updatedRole, permissions: updatedRolePermissions};
    setUpdatedRole(newUpdatedRole);
    setSelectedPerm(newUpdatedRole.permissions.some(p => p._id.toString() === permission._id.toString()));
    setUpdatedPerm(true);
  };

  return (
    <input
      type="checkbox"
      id={`role-permis${role._id}${permission._id}`}
      className="mr-1"
      checked={selectedPerm}
      onChange={(e) => handlePermissions(e, permission._id, permission)}
      value={permission._id}
    />
  )
}

export default SelectedPermission
