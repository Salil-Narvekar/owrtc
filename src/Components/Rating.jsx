import React from 'react'

const Rating = ({ratingValue}) => {
  return (
    <div className='text-xs grid content-center w-6 h-5 mt-1 rounded-md bg-yellow-500 '>
        <span>{ratingValue}</span>
    </div>
  )
}

export default Rating