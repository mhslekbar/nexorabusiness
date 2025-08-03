import React from 'react'
import ShowUsers from '../components/users/ShowUsers'
import { useTranslation } from 'react-i18next'

const Users:React.FC = () => {
  const { t } = useTranslation()

  return (
    <div>
      <h1 className='text-center text-3xl'>{t("Utilisateurs")}</h1>
      <ShowUsers />
    </div>
  )
}

export default Users
