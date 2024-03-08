import React from 'react'

const ButtonSecondary = ({ buttonLable, name, onClick, size }) => {
  return (
    <div>
      <div className=
        {
          size === "small" ?
            "py-1 pl-1 pr-1 bg-gradient-to-r from-green-600 to-green-500 text-white text-sm transition duration-500 ease-in-out hover:scale-95 hover:bg-gradient-to-l hover:text-lime-200 cursor-pointer rounded-lg sm:w-full md:w-auto font-semibold"
            :
            "py-2 pl-4 pr-4 bg-gradient-to-r from-green-600 to-green-500 text-white text-sm transition duration-500 ease-in-out hover:scale-95 hover:bg-gradient-to-l hover:text-lime-200 cursor-pointer rounded-lg sm:w-full md:w-auto font-semibold"
        }
        name={name}
        onClick={onClick}
        size={size}
      >
        {buttonLable}
      </div>
    </div>
  )
}

export default ButtonSecondary