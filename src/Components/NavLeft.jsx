import React from 'react'
import OwrtcLogoText from './OwrtcLogoText'
import Rating from './Rating'

const NavLeft = ({userName, role, rating}) => {
    return (
        <div className='sm:text-xl font-medium sm:grid grid-flow-col auto-cols-max gap-2 ml-2'>

            <OwrtcLogoText />

            <div className='ml-3'>
                <span className='mr-1'>{userName}</span>
                <small className='sm:text-xs'>{role}</small>
            </div>

            <Rating ratingValue={rating} />
        </div>
    )
}

export default NavLeft