import React, { useContext, useState } from "react";
import { FaChevronCircleLeft, FaPlus } from "react-icons/fa";
import InputsAddUser from "./forms/InputsAddUser";
import { AddUserContext } from "./types";
import { AddUserApi } from "../../redux/users/UserApiCalls";
import { useDispatch } from "react-redux";
import { Timeout } from "../../functions/functions";

import { ShowUserContext } from "./ShowUsers";
import { PermissionType } from "../roles/types";
import { useNavigate } from "react-router";
import ButtonsForm from "../../HtmlComponents/ButtonsForm";
import ShowErrorMsg from "../../HtmlComponents/ShowErrorMsg";

const AddUser: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [checkedRoles, setCheckedRoles] = useState<PermissionType[]>([]);

  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
  };

  const { setSuccessMsg } = useContext(ShowUserContext);
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false)

  const dispatch: any = useDispatch();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const data = {
      username,
      phone,
      password,
      roles: checkedRoles.map((role: any) => role._id),
    };
    setLoading(true)
    try {
      const response = await dispatch(AddUserApi(data))
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
    } finally {
      setLoading(false)
    }
  };
  
  const navigate = useNavigate()

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
      <div className="flex justify-start gap-2">
        <FaChevronCircleLeft style={{ fontSize: "30px" }} className="text-main" onClick={() => navigate(-1)}/>
        <button className="p-2 rounded btn-main" onClick={toggle}>
          <FaPlus />
        </button>
      </div>
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
                    <ButtonsForm loading={loading} toggle={toggle} typeBtn="Ajouter" />
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

export default AddUser;
