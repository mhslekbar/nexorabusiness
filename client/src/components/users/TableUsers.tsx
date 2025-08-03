import React, { useContext } from "react";
import { UserInterface } from "./types";
import { PermissionType } from "../roles/types";
import { FaEdit } from "react-icons/fa";
import { MdRemoveCircle } from "react-icons/md";
import { ShowUserContext } from "./ShowUsers";
import { useTranslation } from "react-i18next";

interface TableUsersInterface {
  users: UserInterface[];
}

const TableUsers: React.FC<TableUsersInterface> = ({ users }) => {
  const { showEditModal, setShowEditModal, setSelectedUser, setShowDeleteModal } = useContext(ShowUserContext)
  
  const toggleEditUser = (user: UserInterface) => {
    setShowEditModal(!showEditModal)
    setSelectedUser(user)
  }

  const toggleDeleteUser = (user: UserInterface) => {
    setShowDeleteModal(!showEditModal)
    setSelectedUser(user)
  }
  
  const { t } = useTranslation()

  return (
    <div className="grid grid-cols-4">
      <div className="col-span-3 flex flex-col border mt-2 shadow">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b border-white font-medium bg-main text-white text-center">
                <tr>
                  <th className="px-6 py-4 border-r">{t("Nom")}</th>
                  <th className="px-6 py-4 border-r">{t("Telephone")}</th>
                  <th className="px-6 py-4 border-r">{t("Roles")}</th>
                  <th className="px-6 py-4 border-r">{t("Actions")}</th>
                </tr>
              </thead>
              <tbody>
                {users
                ?.filter((user: UserInterface) => !user.dev)
                ?.map((user: UserInterface, index) => (
                  <tr className="border-b " key={index}>
                    <td className="whitespace-nowrap px-4 py-2 border-r bg-white font-medium">
                      {user.username}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 border-r bg-white font-medium">
                      {user.phone}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 border-r bg-white font-medium">
                      {user.roles.map((role:PermissionType, index) => `${role.name}${user.roles.length > 1 && user.roles.length - 1 > index  ? ", " : ""}`)}
                    </td>
                    <td className="bg-white h-full">
                      <div className="flex justify-center">
                        <FaEdit className="text-second" style={{
                          fontSize: "22px"
                        }} 
                        onClick={() => toggleEditUser(user)}
                        />
                        <MdRemoveCircle className="text-red" style={{
                          fontSize: "22px"
                        }}
                        onClick={() => toggleDeleteUser(user)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default TableUsers;
