import React, { FormEvent, useContext, useState } from 'react';
import { PermissionInterface, ShowPermissionContext } from './types';
import ButtonsForm from '../../HtmlComponents/ButtonsForm';
import { useDispatch } from 'react-redux';
import { DeletePermissionApi } from '../../redux/permissions/permissionApiCalls';
import { Timeout } from '../../functions/functions';
import ShowErrorMsg from '../../HtmlComponents/ShowErrorMsg';

interface DeletePermissionInterface {
  modal: boolean,
  toggle: () => void,
  PermissionData: PermissionInterface
}

const DeletePermission:React.FC<DeletePermissionInterface> = ({ modal, toggle, PermissionData }) => {
  const [errors, setErrors] = useState([])
    
  const dispatch: any = useDispatch()
  const { setShowSuccesMsg } = useContext(ShowPermissionContext)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      const response = await dispatch(DeletePermissionApi(PermissionData._id))
      if(response === true) {
        toggle()
        setShowSuccesMsg(true)
        setTimeout(() => setShowSuccesMsg(false), Timeout)
      }
    } catch {}
  }
  
  return (
    <>
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
                    onSubmit={handleSubmit}
                  > 
                    <ShowErrorMsg errors={errors} setErrors={setErrors} />
                    <ButtonsForm typeBtn='Supprimer' toggle={toggle}  />
                  </form>
                  {/* End Modal Body */}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default DeletePermission
