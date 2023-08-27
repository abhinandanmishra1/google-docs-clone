import React from 'react'
import { DocumentHeader } from '../Header'
import { TextEditor } from '../TextEditor'

export const Document = () => {
  return (
    <div className='w-full'>
        <DocumentHeader />
        <TextEditor />
    </div>
  )
}
