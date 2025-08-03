import React, { useContext, useEffect, useState } from "react";
import { AddUserContext } from "../types";
import { PermissionType } from "../../roles/types";
import { useTranslation } from "react-i18next";
import { InputElement } from "../../../HtmlComponents/InputElement";
import { useSelector } from "react-redux";
import { State } from "../../../redux/store";

const InputsAddUser: React.FC = () => {
  const {
    username,
    setUsername,
    phone,
    setPhone,
    password,
    setPassword,
    checkedRoles,
    setCheckedRoles,
  } = useContext(AddUserContext);

  const [listRoles, setListRoles] = useState([]);
  const { roles } = useSelector((state: State) => state.roles)

  useEffect(() => {
    try {
      setListRoles(roles);
    } catch (error) {
      console.log(error);
    }
  }, [roles]);

  const handleChangeRole = (e: any, role: PermissionType) => {
    if (!e.target.checked) {
      setCheckedRoles(
        checkedRoles.filter((element: PermissionType) => element._id !== role._id)
      );
    } else {
      setCheckedRoles([...checkedRoles, role]);
    }
  };
  
  const { t } = useTranslation()

  return (
    <React.Fragment>
      <InputElement name={t("Nom")} placeholder={t("Nom")} value={username} setValue={setUsername} />
      <InputElement name={t("Telephone")} placeholder={t("Telephone")} value={phone} setValue={setPhone} />
      <InputElement type="password" name={t("Mot de passe")} placeholder={t("Mot de passe")} value={password} setValue={setPassword} />

      <div className="mb-2 text-start">
        <p id="block text-gray-700 font-bold">{t("Roles")}</p>
        <div className="grid grid-cols-3">
          {listRoles.map((role: any, index) => (
            <div className="block" key={index}>
              <input
                type="checkbox"
                id={`role${role._id}`}
                className="shadow"
                checked={checkedRoles.some((elem) => elem._id === role._id)}
                value={role._id}
                onChange={(e) => handleChangeRole(e, role)}
              />{" "}
              <label
                htmlFor={`role${role._id}`}
                className="text-gray-700 font-bold"
              >
                {role.name}
              </label>
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default InputsAddUser;
