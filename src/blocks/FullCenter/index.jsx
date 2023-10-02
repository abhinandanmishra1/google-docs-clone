import React from 'react'

export const FullCenter = ({children}) => {
  return (
    <div className='flex justify-center items-center h-full mt-2'>
        {children}
    </div>
  )
}
