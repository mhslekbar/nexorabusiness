import React, { useEffect, useState } from "react";
import SelectedPermission from "./SelectedPermission";
import { SingleRoleByPermissionType, RoleType, PermissionType } from "../types";
import { useSelector } from "react-redux";
import { State } from "../../../redux/store";
import { useDispatch } from "react-redux";
import { ShowPermissionApi } from "../../../redux/permissions/permissionApiCalls";
import { useTranslation } from "react-i18next";

interface ListPermissionInterface {
  collectionName: SingleRoleByPermissionType;
  role: RoleType;
}
const ListPermission: React.FC<ListPermissionInterface> = ({
  collectionName,
  role,
}) => {
  const { permissions }: { permissions: PermissionType[]} = useSelector((state: State) => state.permissions);
  const [allowedPermission, setAllowedPermissions] = useState<PermissionType[]>([]);
  const dispatch: any = useDispatch();

  useEffect(() => {
    const fetchPermission = async () => {
      await dispatch(ShowPermissionApi())
    }
    fetchPermission()
  }, [dispatch]);

  useEffect(() => {
    const filteredPermis = permissions?.filter(
      (perm) => perm.collectionName === collectionName._id
    );
    setAllowedPermissions(filteredPermis);
  }, [collectionName, permissions]);
  
  const { t }  =useTranslation()

  return (
    <div id={`role-collection${collectionName._id}${role._id}`} hidden>
      {allowedPermission.map((permission) => (
        <div key={permission._id}>
          <SelectedPermission
            permission={permission}
            role={role}
          />
          <label htmlFor={`role-permis${role._id}${permission._id}`}>
            {t(permission.name)}
          </label>
        </div>
      ))}
    </div>
  );
};

export default ListPermission;
