import React, { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ShowRoleContext } from './ShowRoles';
import { bindActionCreators } from 'redux';
import { RoleType } from "./types";
import { deleteRoleApi } from "../../redux/roles/roleApiCalls";
import { Timeout } from '../../functions/functions';
import ButtonsForm from '../../HtmlComponents/ButtonsForm';
import ShowErrorMsg from '../../HtmlComponents/ShowErrorMsg';

interface DeleteRoleInterface {
 modal: boolean,
 toggle: any,
 roleData: RoleType
}

const DeleteRole:React.FC<DeleteRoleInterface> = ({ modal, toggle, roleData }) => {
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch();
  const { setShowSuccessMsg } = useContext(ShowRoleContext);
  

  const handleEditRole = async (e: any) => {
    e.preventDefault();
    setLoading(true)
    try {
      const boundApi = bindActionCreators({ deleteRoleApi }, dispatch);
      const response = await boundApi.deleteRoleApi(roleData._id);
      if (typeof response === "boolean") {
        setShowSuccessMsg(true);
        toggle();
        setTimeout(() => setShowSuccessMsg(false), Timeout);
      } else if (Array.isArray(response)) {
        setErrors(response);
      }
    } finally {
      setLoading(false)
    }
  };

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
                  {/* Start Modal Body */}
                  <form
                    className="mt-2 sm:ml-4 sm:text-left"
                    onSubmit={handleEditRole}
                  >
                    {/* My Inputs */}
                    <ShowErrorMsg errors={errors} setErrors={setErrors} />
                    {/* START Modal Footer */}
                    <ButtonsForm loading={loading} typeBtn="Supprimer" toggle={toggle} /> 
                    {/* End Modal Footer */}
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
}

export default DeleteRole
