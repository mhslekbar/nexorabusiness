import React, { useContext, useState } from "react";
import InputsAddUser from "./forms/InputsAddUser";
import { AddUserContext, UserInterface } from "./types";
import { bindActionCreators } from "redux";
import { EditUserApi } from "../../redux/users/UserApiCalls";
import { useDispatch } from "react-redux";
import { Timeout } from "../../functions/functions";

import { ShowUserContext } from "./ShowUsers";
import { PermissionType } from "../roles/types";
import ButtonsForm from "../../HtmlComponents/ButtonsForm";
import ShowErrorMsg from "../../HtmlComponents/ShowErrorMsg";

interface EditUserInterface {
  modal: boolean,
  toggle: () => void,
  user: UserInterface
}

const EditUser: React.FC<EditUserInterface> = ({ modal, toggle, user }) => {
  const [username, setUsername] = useState<string>(user.username);
  const [phone, setPhone] = useState<string>(user.phone);
  const [password, setPassword] = useState<string>("");

  const [checkedRoles, setCheckedRoles] = useState<PermissionType[]>(user.roles);

  const { setSuccessMsg } = useContext(ShowUserContext);
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const data = {
        username,
        phone,
        password,
        roles: checkedRoles.map((role: any) => role._id),
      };
      setLoading(true)
      const boundActions = bindActionCreators({ EditUserApi }, dispatch);
      const response = await boundActions.EditUserApi(user._id, data);
      if (typeof response === "boolean") {
        setUsername("");
        setPhone("");
        setPassword("");
        setCheckedRoles([]);
        setSuccessMsg(true);
        setTimeout(() => setSuccessMsg(false), Timeout);
        toggle();
      } else if (Array.isArray(response)) {
        setErrors(response);
      }
    } catch(err) {
      console.log("Err: ", err)
    } finally {
      setLoading(false)
    }
  };

  return (
    <AddUserContext.Provider
    value={{
      username,
      setUsername,
      phone,
      setPhone,
      password,
      setPassword,
      checkedRoles,
      setCheckedRoles,
    }}
  >
      {modal && (
        <>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div
              className="fixed inset-0 w-full h-full bg-black opacity-40"
              onClick={toggle}
            ></div>
            <div className="flex items-center min-h-screen px-4 py-8">
              <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                <div className="mt-3">
                  <ShowErrorMsg errors={errors} setErrors={setErrors} />
                  {/* Start Modal Body */}
                  <form
                    className="mt-2 sm:ml-4 sm:text-left"
                    onSubmit={handleSubmit}
                  >
                    <InputsAddUser />
                    <ButtonsForm loading={loading} toggle={toggle} typeBtn="Modifier" />
                  </form>
                  {/* End Modal Body */}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </AddUserContext.Provider>
  );
};

export default EditUser;
