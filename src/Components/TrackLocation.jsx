import React, { useContext } from 'react'
import { useNavigate } from "react-router-dom";
import { LoggedUserDetails, FetchEmployeeIdDetails } from '../App';
import ButtonSecondary from './ButtonSecondary';
import Rating from './Rating'
import Navbar from './Navbar'

const TrackLocation = () => {

    const navigate = useNavigate();
    const loggedUserDetails = useContext(LoggedUserDetails);
    const fetchEmployeeIdDetails = useContext(FetchEmployeeIdDetails);

    return (
        <div>

            <Navbar
                userName={loggedUserDetails.loggedUser.Employee_Name}
                role={loggedUserDetails.loggedUser.Roles}
                rating={loggedUserDetails.loggedUser.Rating}
            />

            <div className='grid sm:grid-cols-3 gap-2 content-center border border-slate-300 rounded-lg bg-sky-50 sm:ml-4 sm:mr-4 mt-5 sm:py-10 sm:pl-6 sm:pr-6'>

                <div className='grid grid-rows-4 justify-items-start text-lg font-semibold py-4 pl-4 h-44 bg-sky-100 rounded-lg'>

                    <div className='grid grid-cols-2 gap-2'>
                        <div> {fetchEmployeeIdDetails.fetchEmployeeIdDetails.Employee_Name}</div>
                        <Rating ratingValue={fetchEmployeeIdDetails.fetchEmployeeIdDetails.Rating} />
                    </div>

                    <span className='text-xs'> {fetchEmployeeIdDetails.fetchEmployeeIdDetails.Roles} </span>
                    <span className='text-base'> {fetchEmployeeIdDetails.fetchEmployeeIdDetails.Email} </span>
                    <span className='text-base'> {fetchEmployeeIdDetails.fetchEmployeeIdDetails.Phone_No} </span>
                    
                    <ButtonSecondary
                        name="videoCall"
                        buttonLable="Video Call"
                        onClick={() => {
                            fetchEmployeeIdDetails.dispatch({ type: "fetchEmployeeIdDetails", value: fetchEmployeeIdDetails.fetchEmployeeIdDetails });
                            navigate('/videoCall')
                        }}
                    />

                </div>

                <div className='col-span-2 grid content-center border border-slate-500 rounded-md h-96'>
                    map
                </div>
            </div>

        </div>
    )
}

export default TrackLocation