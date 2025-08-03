import React, { FormEvent, useContext, useState } from 'react';
import { FaChevronCircleLeft, FaPlus } from 'react-icons/fa';
import { DataPermissionContext, ShowPermissionContext } from './types';
import InputsPermission from './forms/InputsPermission';
import ButtonsForm from '../../HtmlComponents/ButtonsForm';
import { useDispatch } from 'react-redux';
import { AddPermissionApi } from '../../redux/permissions/permissionApiCalls';
import { Timeout } from '../../functions/functions';
import { useNavigate } from 'react-router';
import ShowErrorMsg from '../../HtmlComponents/ShowErrorMsg';


const AddPermission:React.FC = () => {
  const [name, setName] = useState("")
  const [collectionName, setCollectionName] = useState("")
  const [errors, setErrors] = useState([])
  
  const [modal, setModal] = useState(false)
  const toggle = () => {
    setModal(!modal)
  }
  
  const dispatch: any = useDispatch()
  const { setShowSuccesMsg } = useContext(ShowPermissionContext)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await dispatch(AddPermissionApi({ name, collectionName }))
      if(response === true) {
        toggle()
        setName("")
        setCollectionName("")
        setShowSuccesMsg(true)
        setTimeout(() => setShowSuccesMsg(false), Timeout)
      }
    } finally {
      setLoading(false)
    }
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
                    <ButtonsForm loading={loading} typeBtn='Ajouter' toggle={toggle}  />
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

export default AddPermission
