import React, { useContext, useState } from 'react';
import { UserInterface } from './types';
import { ShowUserContext } from './ShowUsers';
import { Timeout } from '../../functions/functions';
import { DeleteUserApi } from '../../redux/users/UserApiCalls';
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import ButtonsForm from '../../HtmlComponents/ButtonsForm';
import ShowErrorMsg from '../../HtmlComponents/ShowErrorMsg';

interface DeleteUserInterface {
  modal: boolean,
  toggle: () => void,
  user: UserInterface
}

const DeleteUser:React.FC<DeleteUserInterface> = ({ modal, toggle, user }) => {
  const { setSuccessMsg } = useContext(ShowUserContext)
  const [errors, setErrors] = useState<string[]>([])
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    try {
      const boundActions = bindActionCreators({ DeleteUserApi }, dispatch)
      const response = await boundActions.DeleteUserApi(user._id)
      if(typeof response === "boolean") {
        setSuccessMsg(true)
        toggle()
        setTimeout(() => setSuccessMsg(false), Timeout)
      } else if(Array.isArray(response)) {
        setErrors(response)
      }
    } finally {
      setLoading(false)
    }
  }

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
                    onSubmit={handleSubmit}
                  >
                    <ShowErrorMsg errors={errors} setErrors={setErrors} />
                    {/* My Inputs */}
                    <p>Vous etes sur de vouloir supprimer <b>{user.username}</b>?</p>
                    {/* START Modal Footer */}
                    <ButtonsForm loading={loading} typeBtn='Supprimer' toggle={toggle} />
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

export default DeleteUser
