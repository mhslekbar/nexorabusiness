import React, { useEffect, useState } from "react";
import { get } from "../../../requestMethods";
import { RoleByPermissionType, DefaultRoleByPermission, RoleType } from "../types";
import ListPermission from "./ListPermission";
import { FaMinus, FaPlus } from "react-icons/fa";
import { Root, createRoot } from "react-dom/client";
import { useTranslation } from "react-i18next";

interface RoleByPermissionInterface {
  role: RoleType
}

const RoleByPermission: React.FC<RoleByPermissionInterface> = ({ role }) => {
  const [roleAndPermission, setRoleAndPermission] =
    useState<RoleByPermissionType>(DefaultRoleByPermission);
  // const [selectedCollection, setSelectedCollection] = useState<RoleByPermissionType>([]);

  useEffect(() => {
    try {
      const fetchRoleByPermission = async () => {
        const response = await get("permission/byTable");
        const resData = response.data.success;
        if (resData) {
          setRoleAndPermission(resData);
        }
      };
      fetchRoleByPermission();
    } catch (err) {
      console.log(err);
    }
  });
  const [rootsTable, setRootsTable] = useState<{ [key: string]: Root }>({}); // Initialize as an empty object

  const toggleCollection = (collection: any) => {
    const selectorCollection = `#role-collection${collection._id}${role._id}`
    const selectorIconCollection = `span#icon-collection${collection._id}${role._id}`
    let icon
    let type = document.querySelector(selectorIconCollection)?.getAttribute("data-type");
 
    switch(type) {
      case "plus": 
        document.querySelector(selectorCollection)?.removeAttribute("hidden")
        document.querySelector(selectorIconCollection)?.setAttribute("data-type", "minus")
        icon = <FaMinus />
      break;
      case "minus":
        document.querySelector(selectorCollection)?.setAttribute("hidden", "true")
        document.querySelector(selectorIconCollection)?.setAttribute("data-type", "plus")
        icon = <FaPlus />
      break;
    }

    const TableGrp = collection._id + role._id
    const selectorElement = document.querySelector(selectorIconCollection);
    if (selectorElement) {
      const rootTable =
        rootsTable[TableGrp] ||
        createRoot(selectorElement);
      rootTable.render(icon);
      setRootsTable({ ...rootsTable, [TableGrp]: rootTable });
    } 
  }

  const { t } = useTranslation()

  return (
    <div>
      {roleAndPermission.length > 0 &&
        roleAndPermission
        ?.sort((a: any, b: any) => a._id?.localeCompare(b._id))
        .map((collectionName, index: number) => (
          <section
            className="bg-[#EEE] border rounded px-4 py-2 shadow mt-2"
            key={index}
          >
          <div className="flex justify-between">
            <p onClick={() => toggleCollection(collectionName)}>{t(collectionName._id)}</p>
            <span id={`icon-collection${collectionName._id}${role._id}`} data-type="plus" className='text-main' style={{
              fontSize: "22px",
            }} onClick={() => toggleCollection(collectionName)}
            >
              <FaPlus />
            </span>
          </div>
          <ListPermission collectionName={collectionName} role={role} />
          </section>
        ))}
    </div>
  );
};

export default RoleByPermission;
