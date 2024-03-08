import React from 'react'
import OwrtcLogoText from './OwrtcLogoText'

const LoginHeader = () => {
    return (
        <div className='sm:text-4xl sm:mt-5 font-semibold grid grid-rows-1'>
            <OwrtcLogoText />
            <div className='text-base capitalize italic'>Welcome To Organization Workflow With Real Time Communication</div>
            <div className='text-xs lowercase'>version:1.0.1</div>
        </div>
    )
}

export default LoginHeader