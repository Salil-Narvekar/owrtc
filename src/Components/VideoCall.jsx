import React, {useContext} from 'react'
import { LoggedUserDetails, FetchEmployeeIdDetails } from '../App';
import ButtonSecondary from './ButtonSecondary'
import InputField from './InputField'
import Navbar from './Navbar'

const VideoCall = ({ callingId }) => {

  const loggedUserDetails = useContext(LoggedUserDetails);
  const fetchEmployeeIdDetails = useContext(FetchEmployeeIdDetails);
  console.log(fetchEmployeeIdDetails)

  return (
    <div>

      <Navbar
        userName={loggedUserDetails.loggedUser.Employee_Name}
        role={loggedUserDetails.loggedUser.Roles}
        rating={loggedUserDetails.loggedUser.Rating}
      />

      <div className='grid content-center border border-slate-300 rounded-lg bg-sky-50 sm:ml-4 sm:mr-4 mt-5 sm:py-10 sm:pl-10 sm:pr-10'>

        <div className='grid sm:grid-cols-3 gap-3 content-center'>

          <div className='col-span-2 grid grid-rows-7 gap-2'>
            <div className='row-span-6 grid content-center rounded-lg bg-gray-300 sm:py-4'>
              Receiver's Video
            </div>

            <div className='sm:grid grid-cols-5 rounded-lg bg-gray-300 py-4'>
              <div className='col-span-3'>
                <InputField
                  label="To join paste received id"
                  name="joinRoom"
                  id="joinRoom"
                  type="text"
                  placeholder="Enter Receiver's Id"
                />
              </div>

              <ButtonSecondary name="joinRoom" buttonLable="Join Room"  />
            </div>
          </div>


          <div className='grid grid-rows-6 gap-1'>
            <div className='row-span-3 grid content-center rounded-lg bg-gray-300 py-4'>
              Caller's Video - <b>{fetchEmployeeIdDetails.fetchEmployeeIdDetails.Employee_Name}</b>
            </div>

            <div className='row-span-1 grid sm:grid-cols-2 gap-1 rounded-lg bg-gray-300 sm:h-12 py-2 pl-20 pr-20'>
              <ButtonSecondary name="startCall" buttonLable="Start Call" />
              <ButtonSecondary name="leaveCall" buttonLable="Leave Call" />
            </div>

            <div className='row-span-2 text-lg font-semibold'>
              <span>If you want to make call Share this id with recepient:</span><br/>
              <span>{callingId}</span>
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}

export default VideoCall