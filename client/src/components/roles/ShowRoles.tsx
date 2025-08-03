import React, { createContext, useEffect, useState } from 'react'
import AddRole from './AddRole'
import SuccessMsg from '../../Messages/SuccessMsg'
import { useSelector } from 'react-redux'
import { State } from '../../redux/store'
import ButtonControls from './controls/ButtonControls'
import { DefaultRoleType, RoleType, ShowRoleType, defaultShowRoleTypeValue } from './types'
import { showRolesApi } from '../../redux/roles/roleApiCalls'
import { useDispatch } from 'react-redux'
import { FaEye } from 'react-icons/fa'
import RoleByPermission from './permissions/RoleByPermission'
import SavePermissions from './SavePermissions'
import { useTranslation } from 'react-i18next'

export const ShowRoleContext = createContext<ShowRoleType>(defaultShowRoleTypeValue)

// Start Component
const ShowRoles:React.FC = () => {
  const [showSuccessMsg, setShowSuccessMsg] = useState<boolean>(false)
  const [selectedRole, setSelectedRole] = useState<RoleType>(DefaultRoleType)
  const [selectedArrayRole, setSelectedArrayRole] = useState<RoleType[]>([])
  const [showRoleByPermission, setShowRoleByPermission] = useState<boolean>(false)
  const { roles } : {roles: RoleType[]}  = useSelector((state: State) => state.roles)  

  const toggleShowRole = (role: RoleType) => {
    const roleIndex = selectedArrayRole.findIndex((selected) => selected._id === role._id);
    if (roleIndex !== -1) {
      // Role is already selected, remove it from the array
      setSelectedArrayRole((prevSelectedRoles) => prevSelectedRoles.filter((selected) => selected._id !== role._id));
    } else {
      // Role is not selected, add it to the array
      setSelectedArrayRole((prevSelectedRoles) => [...prevSelectedRoles, role]);
    }
    setSelectedRole(role)
    setShowRoleByPermission(!showRoleByPermission)
  }

  const dispatch: any = useDispatch()
  
  useEffect(() => {
    const fetchRoles = async () => {
      await dispatch(showRolesApi())
    }
    fetchRoles();
  }, [dispatch]);

  const { t }  =useTranslation()

  return (
    <div>
    <ShowRoleContext.Provider value={{
      showSuccessMsg,
      setShowSuccessMsg,
      selectedRole,
      setSelectedRole,
    }}>
      {showSuccessMsg && <SuccessMsg modal={showSuccessMsg} toggle={() => setShowSuccessMsg(!showSuccessMsg)}/>}
      <AddRole />

      <div className='grid xs:grid-cols-1 lg:grid-cols-3 mt-2 gap-2 h-fit' >
      {
        roles.length > 0 &&
        roles?.map((role: RoleType, index: number) => 
          <div key={index} className='col-span-1'>
            <section className='bg-white border rounded px-4 py-2 flex justify-between shadow'>
              <ButtonControls role={role} />
              <p className='flex justify-start flex-grow' onClick={() => toggleShowRole(role)}>{t(role.name)}</p>
              <FaEye className='text-main' style={{
                  fontSize: "22px",
                }}
                onClick={() => toggleShowRole(role)}
              />
            </section>
            {selectedArrayRole.some((selected) => selected._id === role._id) && (
              <>
                <RoleByPermission role={role} />
                <SavePermissions role={role} />
              </>
            )}
            
          </div>          
        )
      }
      </div>
    </ShowRoleContext.Provider>
    </div>
  )
}

export default ShowRoles
