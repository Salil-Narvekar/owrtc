import React from 'react'
import NavLeft from './NavLeft'
import NavRight from './NavRight'

const Navbar = ({userName, role, rating }) => {
  return (
    <div className='grid grid-cols-2 m-2'>

      <NavLeft userName={userName} role={role} rating={rating}/>
      <NavRight/>
      
    </div>
  )
}

export default Navbar