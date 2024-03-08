import React from 'react'

const ValidationErrorMsg = ({validationMsg}) => {
  return (
    <div className='text-xs text-red-600 text-md font-semibold grid text-right'>
        {validationMsg}
    </div>
  )
}

export default ValidationErrorMsg