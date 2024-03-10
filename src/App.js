import './App.css';
import React, { useReducer, createContext } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import employeeData from './JsonFiles/employeeData.json'
import assignmentData from './JsonFiles/assignmentData.json'
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import RegisterEmployee from './Components/RegisterEmployee';
import AsignAssignment from './Components/AsignAssignment';
import VideoCall from './Components/VideoCall';
import TrackLocation from './Components/TrackLocation';

export const LoggedUserDetails = createContext();
export const RolesArr = createContext();
export const AssignmentTypeArr = createContext();
export const EmployeeData = createContext();
export const AssignmentData = createContext();
export const FetchEmployeeIdDetails = createContext();
export const FetchAssignmentIdDetails = createContext();

// Reducer function for fetching logged-In User details on login
const initialUserState = {
  ID: '',
  Employee_Name: '',
  Email: '',
  Phone_No: '',
  Passwords: '',
  Roles: '',
  Active: '',
  Rating: '',
  Location: '',
  WIP: ''
};

const reducerUser = (state, action) => {
  switch (action.type) {
    case 'loggedIn':
      return {
        ID: action.value.ID,
        Employee_Name: action.value.Employee_Name,
        Email: action.value.Email,
        Phone_No: action.value.Phone_No,
        Passwords: action.value.Passwords,
        Roles: action.value.Roles,
        Active: action.value.Active,
        Rating: action.value.Rating,
        Location: action.value.Location,
        WIP: action.value.WIP
      }
    // return console.log("loggedIn", action.value);

    case 'loggedOut':
      return initialUserState
    default:
      return initialUserState
  }
}


// Reducer function for fetching employee details as per id on click of that employee
const initialEmployeeIdDetailsState = {
  ID: '',
  Employee_Name: '',
  Email: '',
  Phone_No: '',
  Passwords: '',
  Roles: '',
  Active: '',
  Rating: '',
  Location: '',
  WIP: ''
}

const reducerEmployeeIdDetails = (state, action) => {
  switch (action.type) {
    case 'fetchEmployeeIdDetails':
      return {
        ID: action.value.ID,
        Employee_Name: action.value.Employee_Name,
        Email: action.value.Email,
        Phone_No: action.value.Phone_No,
        Passwords: action.value.Passwords,
        Roles: action.value.Roles,
        Active: action.value.Active,
        Rating: action.value.Rating,
        Location: action.value.Location,
        WIP: action.value.WIP
      }
    case "emptyFetchEmployeeIdDetails":
      return initialEmployeeIdDetailsState
    default:
      return initialEmployeeIdDetailsState
  }
}


// Reducer function for fetching assignment details as per id on click of that assignment
const initialAssignmentIdDetails = {
  ID: "",
  Assignment_Title: "",
  Assignment_Type: "",
  Assignment_Status: "",
  Created_Date: "",
  Started_Date: "",
  Completion_Date: "",
  TeamJson: {},
  Project_Manager: ""
}

const reducerAssignmentIdDetails = (state, action) => {
  switch (action.type) {
    case 'fetchAssignmentIdDetails':
      return {
        ID: action.value.ID,
        Assignment_Title: action.value.Assignment_Title,
        Assignment_Type: action.value.Assignment_Type,
        Assignment_Status: action.value.Assignment_Status,
        Created_Date: action.value.Created_Date,
        Started_Date: action.value.Started_Date,
        Completion_Date: action.value.Completion_Date,
        TeamJson: action.value.TeamJson,
        Project_Manager: action.value.Project_Manager,
      }
    case "emptyFetchAssignmentIdDetails":
      return initialAssignmentIdDetails
    default:
      return initialAssignmentIdDetails
  }
}

function App() {
  const [loggedUser, dispatchUser] = useReducer(reducerUser, initialUserState);
  const [fetchEmployeeIdDetails, dispatchEmployeeIdDetails] = useReducer(reducerEmployeeIdDetails, initialEmployeeIdDetailsState);
  const [fetchAssignmentIdDetails, dispatchAssignmentIdDetails] = useReducer(reducerAssignmentIdDetails, initialAssignmentIdDetails);

  return (

    <LoggedUserDetails.Provider value={{ loggedUser: loggedUser, dispatch: dispatchUser }}>
      <RolesArr.Provider value={["HR", "Project Manager", "Animator", "Designer", "Sales"]}>
        <AssignmentTypeArr.Provider value={["Completed", "WIP", "Not Started"]}>
          <EmployeeData.Provider value={employeeData}>
            <AssignmentData.Provider value={assignmentData}>
              <FetchEmployeeIdDetails.Provider value={{ fetchEmployeeIdDetails: fetchEmployeeIdDetails, dispatch: dispatchEmployeeIdDetails }}>
                <FetchAssignmentIdDetails.Provider value={{ fetchAssignmentIdDetails: fetchAssignmentIdDetails, dispatch: dispatchAssignmentIdDetails }}>

                  <div className="text-center h-screen font-sans sm:overflow-hidden bg-sky-100">
                    <BrowserRouter basename={process.env.PUBLIC_URL}>
                      <Routes>
                        <Route exact path='/owrtc' element={<Login />} />
                        <Route path='/dashboard' element={<Dashboard />} />
                        <Route path='/registration' element={<RegisterEmployee />} />
                        <Route path='/asignNewAssignment' element={<AsignAssignment />} />
                        <Route path='/videoCall' element={<VideoCall />} />
                        <Route path='/tractLocation' element={<TrackLocation />} />
                      </Routes>
                    </BrowserRouter>
                  </div>

                </FetchAssignmentIdDetails.Provider>
              </FetchEmployeeIdDetails.Provider>
            </AssignmentData.Provider>
          </EmployeeData.Provider>
        </AssignmentTypeArr.Provider>
      </RolesArr.Provider>
    </LoggedUserDetails.Provider>
  );
}

export default App;
