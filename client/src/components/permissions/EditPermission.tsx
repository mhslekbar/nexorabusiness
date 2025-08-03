import React, { FormEvent, useContext, useState } from 'react';
import { FaChevronCircleLeft, FaPlus } from 'react-icons/fa';
import { DataPermissionContext, PermissionInterface, ShowPermissionContext } from './types';
import InputsPermission from './forms/InputsPermission';
import ButtonsForm from '../../HtmlComponents/ButtonsForm';
import { useDispatch } from 'react-redux';
import { EditPermissionApi } from '../../redux/permissions/permissionApiCalls';
import { Timeout } from '../../functions/functions';
import { useNavigate } from 'react-router';
import ShowErrorMsg from '../../HtmlComponents/ShowErrorMsg';

interface EditPermissionInterface {
  modal: boolean,
  toggle: () => void,
  PermissionData: PermissionInterface
}

const EditPermission:React.FC<EditPermissionInterface> = ({ modal, toggle, PermissionData }) => {
  const [name, setName] = useState(PermissionData.name)
  const [collectionName, setCollectionName] = useState(PermissionData.collectionName)
  const [errors, setErrors] = useState([])
    
  const dispatch: any = useDispatch()
  const { setShowSuccesMsg } = useContext(ShowPermissionContext)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      const response = await dispatch(EditPermissionApi(PermissionData._id, { name, collectionName }))
      if(response === true) {
        toggle()
        setName("")
        setCollectionName("")
        setShowSuccesMsg(true)
        setTimeout(() => setShowSuccesMsg(false), Timeout)
      }
    } catch {}
  }

  const navigate = useNavigate()
  
  return (
    <DataPermissionContext.Provider value={{
      name, setName,
      collectionName, setCollectionName
    }}>
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
                    onSubmit={handleSubmit}
                  > 
                    <ShowErrorMsg errors={errors} setErrors={setErrors} />
                    <InputsPermission />
                    <ButtonsForm typeBtn='Modifier' toggle={toggle}  />
                  </form>
                  {/* End Modal Body */}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </DataPermissionContext.Provider>
  );
}

export default EditPermission
