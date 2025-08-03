import React, { useContext } from 'react'
import { DataPermissionContext } from '../types'
import { InputElement } from '../../../HtmlComponents/InputElement'

const InputsPermission = () => {
  const { 
    name, setName,
    collectionName, setCollectionName
   }  = useContext(DataPermissionContext)
  return (
    <>
      <InputElement name="Name" value={name} setValue={setName} />
      <InputElement name="Collection Name" value={collectionName} setValue={setCollectionName} />
    </>
  )
}

export default InputsPermission
