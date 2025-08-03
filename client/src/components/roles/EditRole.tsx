import React, { useContext, useState } from "react";
import { Timeout } from "../../functions/functions";
import { RoleType } from "./types";
import { editRoleApi } from "../../redux/roles/roleApiCalls";
import { useDispatch } from "react-redux";
import { ShowRoleContext } from "./ShowRoles";
import ButtonsForm from "../../HtmlComponents/ButtonsForm";
import ShowErrorMsg from "../../HtmlComponents/ShowErrorMsg";
import { useTranslation } from "react-i18next";
import { InputElement } from "../../HtmlComponents/InputElement";

interface EditRoleInterface {
  modal: boolean;
  toggle: any;
  roleData: RoleType;
}

const EditRole: React.FC<EditRoleInterface> = ({ modal, toggle, roleData }) => {
  const [role, setRole] = useState<string>(roleData.name);
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false)

  const dispatch: any = useDispatch();
  const { setShowSuccessMsg } = useContext(ShowRoleContext);

  const handleEditRole = async (e: any) => {
    e.preventDefault();
    setLoading(true)
    try {
      const response: any = await dispatch(editRoleApi(roleData._id, { name: role.trim() }))
      if (response === true) {
        setShowSuccessMsg(true);
        toggle();
        setTimeout(() => setShowSuccessMsg(false), Timeout);
        setRole("");
      } else if (Array.isArray(response)) {
        setErrors(response);
      }
    } finally {
      setLoading(false)
    }
  };

  const { t } = useTranslation()

  return (
    <div>
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
                  <form
                    className="mt-2 sm:ml-4 sm:text-left"
                    onSubmit={handleEditRole}
                  >
                    <ShowErrorMsg errors={errors} setErrors={setErrors} />
                    <InputElement name={t("Role")} value={role} setValue={setRole} />
                    <ButtonsForm loading={loading} typeBtn="Modifier" toggle={toggle} /> 
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default EditRole;
