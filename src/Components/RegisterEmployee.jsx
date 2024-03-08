import React, { useContext, useState } from 'react'
import { LoggedUserDetails, RolesArr, FetchEmployeeIdDetails } from '../App';
import Loader from './Loader';
import ButtonMain from './ButtonMain'
import InputField from './InputField'
import Select from "react-dropdown-select";
import Navbar from './Navbar';
import ValidationErrorMsg from './ValidationErrorMsg';

const RegisterEmployee = () => {

    const rolesArr = useContext(RolesArr);
    const loggedUserDetails = useContext(LoggedUserDetails);
    const fetchEmployeeIdDetails = useContext(FetchEmployeeIdDetails);

    const [validationFlag, setValidationFlag] = useState(true);
    const [passwordMismatched, setPasswordMismatched] = useState(false);
    const [passwordMismatchedMsg, setPasswordMismatchedMsg] = useState('');

    const [loader, setLoader] = useState(false);

    const showLoading = () => {
        setLoader(true);
        setTimeout(() => {
            setLoader(false);
        }, 1000);
    };

    const [employeeDetails, setEmployeeDetails] = useState(
        {
            Employee_Name: fetchEmployeeIdDetails.fetchEmployeeIdDetails.Employee_Name ? fetchEmployeeIdDetails.fetchEmployeeIdDetails.Employee_Name : '',
            Email: fetchEmployeeIdDetails.fetchEmployeeIdDetails.Email ? fetchEmployeeIdDetails.fetchEmployeeIdDetails.Email : '',
            Phone_No: fetchEmployeeIdDetails.fetchEmployeeIdDetails.Phone_No ? fetchEmployeeIdDetails.fetchEmployeeIdDetails.Phone_No : '',
            Roles: fetchEmployeeIdDetails.fetchEmployeeIdDetails.Roles ? fetchEmployeeIdDetails.fetchEmployeeIdDetails.Roles : '',
            Passwords: fetchEmployeeIdDetails.fetchEmployeeIdDetails.Passwords ? fetchEmployeeIdDetails.fetchEmployeeIdDetails.Passwords : '',
            Confirm_Password: ''
        }
    );
    // console.log("employeeDetails", employeeDetails);


    const rolesList = rolesArr.map((value, index) => (
        {
            roleId: index,
            roleName: value
        }
    ))

    const setRole = (value) => {
        // console.log("SelectBox Value", value[0].roleName)
        setEmployeeDetails((prevSetDetails) => ({
            ...prevSetDetails,
            Roles: value[0].roleName
        }));
    };

    const confirmPasswords = (CpassValue) => {

        if (employeeDetails.Passwords !== CpassValue) {
            setPasswordMismatchedMsg('Passwords do not match !!');
            setPasswordMismatched(true);

        } else if (employeeDetails.Passwords === CpassValue) {
            setPasswordMismatchedMsg('Passwords matched');
            setPasswordMismatched(false);
        }
    }

    const validateForm = () => {

        if (!employeeDetails.Employee_Name) {
            setValidationFlag(false);

        } else if (!employeeDetails.Email) {
            setValidationFlag(false);

        } else if (!employeeDetails.Phone_No) {
            setValidationFlag(false);

        } else if (!employeeDetails.Roles) {
            setValidationFlag(false);

        } else if (!employeeDetails.Passwords) {
            setValidationFlag(false);

        } else if (!employeeDetails.Confirm_Password && !fetchEmployeeIdDetails.fetchEmployeeIdDetails.ID) {
            setValidationFlag(false);

        } else {
            setValidationFlag(true);
        }
    };

    const register = (e) => {
        e.preventDefault();
        validateForm();
        showLoading()

        if (validationFlag && !passwordMismatched) {
            console.log("Registered");
        }
    };

    return (
        <div>

            <Navbar
                userName={loggedUserDetails.loggedUser.Employee_Name}
                role={loggedUserDetails.loggedUser.Roles}
                rating={loggedUserDetails.loggedUser.Rating}
            />

            <form onSubmit={register} className='grid grid-flow-rows gap-5 justify-items-center border border-slate-300 rounded-lg bg-sky-50 sm:ml-4 sm:mr-4 mt-5 sm:py-4 text-gray-500 '>
                <span className='text-2xl text-gray-700 font-bold mt-10 mb-6'>Register</span>

                <div>
                    <InputField
                        label="Employee's Name"
                        name="Employee_Name"
                        id="Employee_Name"
                        type="text"
                        placeholder="Enter employee name"
                        value={employeeDetails.Employee_Name}
                        onChange={(e) => {
                            setEmployeeDetails((prevSetDetails) => ({
                                ...prevSetDetails,
                                Employee_Name: e.target.value
                            }));
                        }}
                    />
                    {
                        !employeeDetails.Employee_Name && !validationFlag && !loader &&
                        <ValidationErrorMsg
                            validationMsg="Employee name required"
                        />
                    }
                </div>

                <div>
                    <InputField
                        label="Employee's Email"
                        name="Email"
                        id="Email"
                        type="email"
                        placeholder="abc123@gmail.com"
                        value={employeeDetails.Email}
                        onChange={(e) => {
                            setEmployeeDetails((prevSetDetails) => ({
                                ...prevSetDetails,
                                Email: e.target.value
                            }));
                        }}
                    />
                    {
                        !employeeDetails.Email && !validationFlag && !loader &&
                        <ValidationErrorMsg
                            validationMsg="Email required"
                        />
                    }
                </div>

                <div>
                    <InputField
                        label="Contact Number"
                        name="Phone_No"
                        id="Phone_No"
                        type="text"
                        min="1"
                        maxLength="10"
                        placeholder="9856****54"
                        value={employeeDetails.Phone_No}
                        onChange={(e) => {
                            setEmployeeDetails((prevSetDetails) => ({
                                ...prevSetDetails,
                                Phone_No: e.target.value
                            }));
                        }}
                    />
                    {
                        !employeeDetails.Phone_No && !validationFlag && !loader &&
                        <ValidationErrorMsg
                            validationMsg="Contact no. required"
                        />
                    }
                </div>

                <div className='grid grid-cols-2 gap-2'>
                    <label className='text-lg font-bold sm:text-right'>Select Role: </label>
                    <div>


                        <div className='sm:w-64 border border-slate-300 bg-white rounded text-black'>
                            <Select
                                options={rolesList}
                                labelField="roleName"
                                valueField="roleId"
                                values={[
                                    {
                                        roleId: rolesArr.indexOf(fetchEmployeeIdDetails.fetchEmployeeIdDetails.Roles),
                                        roleName: fetchEmployeeIdDetails.fetchEmployeeIdDetails.Roles
                                    }
                                ]}
                                onChange={(values) => setRole(values)}
                            />

                        </div>
                        {
                            !employeeDetails.Roles && !validationFlag && !loader &&
                            <ValidationErrorMsg
                                validationMsg="Select Role"
                            />
                        }
                    </div>
                </div>

                <div>
                    <InputField
                        label="Password"
                        name="Passwords"
                        id="Passwords"
                        type="password"
                        placeholder="xxxx"
                        value={employeeDetails.Passwords}
                        onChange={(e) => {
                            setEmployeeDetails((prevSetDetails) => ({
                                ...prevSetDetails,
                                Passwords: e.target.value,
                                Confirm_Password: ""
                            }));
                            setPasswordMismatched(false);
                            setPasswordMismatchedMsg('')
                        }}
                    />
                    {
                        !employeeDetails.Passwords && !validationFlag && !loader &&
                        <ValidationErrorMsg
                            validationMsg="Password Required"
                        />
                    }
                </div>

                {
                    !fetchEmployeeIdDetails.fetchEmployeeIdDetails.ID &&

                    <div>
                        <InputField
                            label="Confirm Password"
                            name="Confirm_Password"
                            id="Confirm_Password"
                            type="password"
                            placeholder="xxxx"
                            value={employeeDetails.Confirm_Password}
                            onChange={(e) => {
                                confirmPasswords(e.target.value);
                                setEmployeeDetails((prevSetDetails) => ({
                                    ...prevSetDetails,
                                    Confirm_Password: e.target.value
                                }));
                            }}
                        />

                        {
                            !employeeDetails.Confirm_Password && !validationFlag && !loader ?
                                <ValidationErrorMsg
                                    validationMsg="Confirm Password Required"
                                />

                                : passwordMismatched ?
                                    <span className='text-xs text-red-600 text-md font-semibold animate-pulse grid text-right'> {passwordMismatchedMsg} </span>
                                    :
                                    <span className='text-xs text-green-600 text-md font-semibold grid text-right'> {passwordMismatchedMsg} </span>
                        }

                    </div>
                }

                {
                    !fetchEmployeeIdDetails.fetchEmployeeIdDetails.ID ?
                        <div>
                            {
                                !loader ?
                                    <ButtonMain name="registerButton" buttonLable="Register" />
                                    :
                                    <Loader />
                            }
                        </div>
                        :
                        <div>
                            {
                                !loader ?
                                    <ButtonMain name="registerButton" buttonLable="Update" />
                                    :
                                    <Loader />
                            }
                        </div>
                }

            </form>
        </div>
    )
}

export default RegisterEmployee