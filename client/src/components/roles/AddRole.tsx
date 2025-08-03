import React, { useContext, useState } from "react";
import { FaChevronCircleLeft, FaPlus } from "react-icons/fa";
import { addRoleApi } from "../../redux/roles/roleApiCalls";
import { useDispatch } from "react-redux";
import { ShowRoleContext } from "./ShowRoles";
import { Timeout } from "../../functions/functions";
import { useNavigate } from "react-router";
import ButtonsForm from "../../HtmlComponents/ButtonsForm";
import { useTranslation } from "react-i18next";
import ShowErrorMsg from "../../HtmlComponents/ShowErrorMsg";
import { InputElement } from "../../HtmlComponents/InputElement";

const AddRole: React.FC = () => {
  const [role, setRole] = useState<string>("");
  const [modal, setModal] = useState<boolean>(false);
  const dispatch: any = useDispatch();
  const { setShowSuccessMsg } = useContext(ShowRoleContext);
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false)

  const handleAddNewRole = async (e: any) => {
    e.preventDefault();
    setLoading(true)
    try {
      const response = await dispatch(addRoleApi({ name: role.trim() }));
      if (typeof response === "boolean") {
        setShowSuccessMsg(true);
        toggle()
        setTimeout(() => setShowSuccessMsg(false), Timeout);
        setRole("")
      } else if (Array.isArray(response)) {
        setErrors(response);
      }
    } finally {
      setLoading(false)
    }
  };

  const toggle = () => {
    setModal(!modal);
  };

  const navigate = useNavigate()

  const { t } = useTranslation()

  return (
    <div>
      <div className="flex justify-start gap-2">
        <FaChevronCircleLeft style={{ fontSize: "30px" }} className="text-main" onClick={() => navigate("/")}/>
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
                  {/* Start Modal Body */}
                  <form
                    className="mt-2 sm:ml-4 sm:text-left"
                    onSubmit={handleAddNewRole}
                  >
                    <ShowErrorMsg errors={errors} setErrors={setErrors} />
                    <InputElement name={t("Role")} value={role} setValue={setRole} />
                    <ButtonsForm loading={loading} typeBtn="Ajouter" toggle={toggle} /> 
                  </form>
                  {/* End Modal Body */}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AddRole;
