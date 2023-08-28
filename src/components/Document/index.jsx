import React from 'react'
import { DocumentHeader } from '../Header'
import { TextEditor } from '../TextEditor'
import { useUserContext } from '../../context/UserContext';

export const Document = () => {
  const user = useUserContext();
  return (
    <div className='w-full'>
        <DocumentHeader user={user} />
        <TextEditor />
    </div>
  )
}
