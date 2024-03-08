import React, { useContext } from 'react'
import { useNavigate } from "react-router-dom";
import { FetchEmployeeIdDetails } from '../App';
import ButtonSecondary from './ButtonSecondary';
import Rating from './Rating'


const EmployeeDetailsPlate = ({ employeeIdDetails, employeeName, rating, contactNo, email }) => {

  const navigate = useNavigate();
  const fetchEmployeeIdDetails = useContext(FetchEmployeeIdDetails);

  return (
    <div className='grid grid-rows-3 justify-items-start border border-slate-300 rounded-lg font-bold h-full max-h-24 py-2 pl-2 pr-2 mb-1 '>

      <div className='grid grid-cols-3 gap-1 justify-items-start'>
        <span className='col-span-2 text-lg text-cyan-600'>{employeeName}</span>
        <Rating ratingValue={rating} />
      </div>

      <div className='text-sm text-left'>
        <span>{contactNo}</span>
        <span className='text-slate-500 ml-2'>{email}</span>
      </div>

      <div className='grid grid-cols-3 gap-1'>

        <ButtonSecondary
          name="videoCall"
          buttonLable="Video"
          size="small"
          onClick={() => {
            fetchEmployeeIdDetails.dispatch({ type: "fetchEmployeeIdDetails", value: employeeIdDetails });
            navigate('/videoCall');
          }}
        />

        <ButtonSecondary
          name="track"
          buttonLable="Track"
          size="small"
          onClick={() => {
            fetchEmployeeIdDetails.dispatch({ type: "fetchEmployeeIdDetails", value: employeeIdDetails });
            navigate('/tractLocation');
          }}
        />

        <ButtonSecondary
          name="edit"
          buttonLable="Edit"
          size="small"
          onClick={() => {
            fetchEmployeeIdDetails.dispatch({ type: "fetchEmployeeIdDetails", value: employeeIdDetails });
            navigate('/registration');
          }}
        />

      </div>
    </div>
  )
}

export default EmployeeDetailsPlate