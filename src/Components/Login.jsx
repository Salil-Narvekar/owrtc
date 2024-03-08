import React, { useState, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import { LoggedUserDetails, EmployeeData } from '../App';
import Loader from './Loader'
import LoginHeader from './LoginHeader'
import InputField from './InputField'
import ButtonMain from './ButtonMain'

const Login = () => {

    const navigate = useNavigate();
    const loggedUserDetails = useContext(LoggedUserDetails);
    const employeeData = useContext(EmployeeData);

    const [userEmail, setUserEmail] = useState('');
    const [userPass, setUserPass] = useState('');
    const [validateEmailFlag, setValidateEmailFlag] = useState(false);
    const [validatePassFlag, setValidatePassFlag] = useState(false);
    const [invalidCredentials, setInvalidCredentials] = useState('');

    const [loader, setLoader] = useState(false);

    const showLoading = () => {
        setLoader(true);
        setTimeout(() => {
            setLoader(false);
        }, 1000);
    };

    const storeEmailValue = (emailValue) => {
        setUserEmail(emailValue);
    };

    const storePassValue = (passValue) => {
        setUserPass(passValue);
    };

    const loginUser = (e) => {
        e.preventDefault();
        showLoading();

        if (userEmail && userPass) {
            const authenticate = employeeData.find((employeeDetails) =>
                employeeDetails.Email === userEmail && employeeDetails.Passwords === userPass
            )

            if (authenticate) {

                setTimeout(() => {
                    navigate("/dashboard");
                }, 1000);

                loggedUserDetails.dispatch({ type: "loggedIn", value: authenticate });

            } else {
                setInvalidCredentials('Invalid credentials, Try again !!')
            }

        } else {

            if (!userEmail) {
                setValidateEmailFlag(true);
            } else if (!userPass) {
                setValidatePassFlag(true);
            }
        }

    }

    return (

        <div className='grid gap-16 justify-center'>

            <div className="grid gap-20 justify-center">

                <LoginHeader />

                <form onSubmit={loginUser} className='border rounded-2xl grid gap-5 justify-center content-center bg-neutral-50 py-12 drop-shadow-lg'>

                    <div className='h-16'>

                        <InputField
                            label="email"
                            name="email"
                            id="email"
                            type="email"
                            placeholder="abc123@gmail.com"
                            labelTop={true}
                            onChange={(e) => {
                                setInvalidCredentials('');
                                setValidateEmailFlag(false);
                                storeEmailValue(e.target.value);
                            }}
                        />

                        {
                            validateEmailFlag && !loader &&
                            <span className='text-red-600 text-xs text-left grid justify-end'>Email required</span>
                        }
                    </div>

                    <div className='h-16 mb-4'>
                        <InputField
                            label="password"
                            name="password"
                            id="password"
                            type="password"
                            placeholder="xxxxxx"
                            labelTop={true}
                            onChange={(e) => {
                                setInvalidCredentials('');
                                setValidatePassFlag(false);
                                storePassValue(e.target.value);
                            }}
                        />

                        {
                            validatePassFlag && !loader &&
                            <span className='text-red-600 text-xs text-left grid justify-end'>Password required</span>
                        }
                    </div>


                    {
                        !loader ?
                            <ButtonMain
                                buttonLable="Login"
                                name="loginButton"
                            />
                            :
                            <Loader />
                    }

                    {
                        invalidCredentials !== '' && !loader &&
                        <span className='text-red-600 text-md font-semibold animate-pulse'> {invalidCredentials} </span>
                    }

                </form>
            </div>

            <div className='grid grid-rows-3 gap-1 justify-center bg-gray-200 border border-gray-300 rounded-lg py-4 pl-2 pr-2'>
                <small className='font-semibold'> - NOTE - </small>
                <small> As the features, functionality & dashboards contents are based upon Role based login, </small>
                <small> For <b>{"HR (Admin) "}</b> Login use credentials: <b>Username - salil123@gmail.com | Password - 11 </b> </small>
                <small> For <b>{"Project Manager "}</b> Login use credentials: <b>Username - mahesh123@gmail.com | Password - 22 </b> </small>
            </div>

        </div>

    )
}

export default Login