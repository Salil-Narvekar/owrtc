import React, { useContext } from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import ButtonMain from './ButtonMain'
import ButtonSecondary from './ButtonSecondary'
import { LoggedUserDetails, FetchEmployeeIdDetails, FetchAssignmentIdDetails } from '../App'

const NavRight = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const loggedUserDetails = useContext(LoggedUserDetails);
  const fetchEmployeeIdDetails = useContext(FetchEmployeeIdDetails);
  const fetchAssignmentIdDetails = useContext(FetchAssignmentIdDetails);

  return (
    <div>

      {
        location.pathname !== "/dashboard" ?
        
          <div className='grid sm:grid-flow-col auto-cols-max gap-2 justify-end mr-2'>
            <ButtonMain name="home" buttonLable="Home" onClick={() => navigate("/dashboard")} />
            <ButtonMain
              name="logout"
              buttonLable="Logout"
              onClick={() => {
                navigate("/");
                loggedUserDetails.dispatch({ type: "loggedOut" });
              }}
            />
          </div>

          :

          <div className='grid sm:grid-flow-col auto-cols-max gap-2 justify-end mr-2'>
            {
              loggedUserDetails.loggedUser.Roles === "HR" ?

                <ButtonMain 
                  name="register" 
                  buttonLable="Register" 
                  onClick={() => {
                    fetchEmployeeIdDetails.dispatch({ type: "emptyFetchEmployeeIdDetails" });
                    navigate("/registration")
                  }} 
                />

                :

                <ButtonMain 
                  name="asign" 
                  buttonLable="Asign" 
                  onClick={() => {
                    fetchAssignmentIdDetails.dispatch({ type: "emptyFetchAssignmentIdDetails" });
                    navigate("/asignNewAssignment")
                  }} 
                />
            }

            <ButtonSecondary 
              name="videoCall"
              buttonLable="Join Video Call" 
              onClick={() => {
                fetchEmployeeIdDetails.dispatch({ type: "fetchEmployeeIdDetails", value: loggedUserDetails.loggedUser });
                navigate("/videoCall")
              }} 
            />

            <ButtonMain
              name="logout"
              buttonLable="Logout"
              onClick={() => {
                navigate("/");
                loggedUserDetails.dispatch({ type: "loggedOut" });
              }}
            />
          </div>
      }


    </div>
  )
}

export default NavRight