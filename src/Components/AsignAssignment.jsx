import React, { useState, useContext } from 'react'
import { LoggedUserDetails, RolesArr, FetchAssignmentIdDetails, EmployeeData } from '../App';
import Loader from './Loader';
import ButtonMain from './ButtonMain'
import InputField from './InputField'
import Navbar from './Navbar'
import ValidationErrorMsg from './ValidationErrorMsg';


const AsignAssignment = () => {

    const loggedUserDetails = useContext(LoggedUserDetails);
    const fetchAssignmentIdDetails = useContext(FetchAssignmentIdDetails);
    const rolesArr = useContext(RolesArr);
    const employeeData = useContext(EmployeeData);
    const roleProfilesArr = rolesArr.slice(2);

    const [loader, setLoader] = useState(false);
    const [loaderAutoAsign, setLoaderAutoAsign] = useState(false);

    const showLoading = () => {
        setLoader(true);
        setTimeout(() => {
            setLoader(false);
        }, 1000);
    };

    const [validationFlag, setValidationFlag] = useState(true);
    const todayDate = new Date().toISOString().split('T')[0]; // to set cuurent date (today)


    // Arr STATES for fetching count from the input wrt roles
    const [designersCount, setDesignersCount] = useState('');
    const [animatorsCount, setAnimatorsCount] = useState('');
    const [salesCount, setSalesCount] = useState('');

    const autoAssignTeam = (e) => {
        e.preventDefault();
        e.stopPropagation();

        // console.log("A:", animatorsCount, ', D:', designersCount, ', S:', salesCount);
        setLoaderAutoAsign(true);
        setTimeout(() => {

            setAssignmentDetails((prevSetDetails) => ({
                ...prevSetDetails,
                TeamJson: {
                    Designer: employeeData.filter(employee => employee.Roles === 'Designer')
                        .sort((b, a) => parseFloat(a.Rating) - parseFloat(b.Rating))
                        .slice(0, designersCount)
                        .map(employee => employee.Employee_Name),

                    Animator: employeeData.filter(employee => employee.Roles === 'Animator')
                        .sort((b, a) => parseFloat(a.Rating) - parseFloat(b.Rating))
                        .slice(0, animatorsCount)
                        .map(employee => employee.Employee_Name),

                    Sales: employeeData.filter(employee => employee.Roles === 'Sales')
                        .sort((b, a) => parseFloat(a.Rating) - parseFloat(b.Rating))
                        .slice(0, salesCount)
                        .map(employee => employee.Employee_Name),
                }
            }));

            setLoaderAutoAsign(false);

        }, 700);
        
        // console.log(assignmentDetails.TeamJson.Animator)
    };


    const [assignmentDetails, setAssignmentDetails] = useState(
        {
            Assignment_Title: fetchAssignmentIdDetails.fetchAssignmentIdDetails.Assignment_Title ? fetchAssignmentIdDetails.fetchAssignmentIdDetails.Assignment_Title : '',
            Assignment_Type: fetchAssignmentIdDetails.fetchAssignmentIdDetails.Assignment_Type ? fetchAssignmentIdDetails.fetchAssignmentIdDetails.Assignment_Type : 'New',
            Assignment_Status: fetchAssignmentIdDetails.fetchAssignmentIdDetails.Assignment_Status ? fetchAssignmentIdDetails.fetchAssignmentIdDetails.Assignment_Status : '',
            Created_Date: fetchAssignmentIdDetails.fetchAssignmentIdDetails.Created_Date ? fetchAssignmentIdDetails.fetchAssignmentIdDetails.Created_Date : todayDate,
            Started_Date: fetchAssignmentIdDetails.fetchAssignmentIdDetails.Started_Date ? fetchAssignmentIdDetails.fetchAssignmentIdDetails.Started_Date : '',
            Completion_Date: fetchAssignmentIdDetails.fetchAssignmentIdDetails.Completion_Date ? fetchAssignmentIdDetails.fetchAssignmentIdDetails.Completion_Date : '',
            TeamJson: {
                Designer: '',
                Animator: '',
                Sales: ''
            },
        }
    );

    const validateForm = () => {

        if (!assignmentDetails.Assignment_Title) {
            setValidationFlag(false);

        } else if (!assignmentDetails.Created_Date) {
            setValidationFlag(false);

        } else if (!assignmentDetails.Started_Date) {
            setValidationFlag(false);

        } else if (!assignmentDetails.Completion_Date) {
            setValidationFlag(false);

        } else if ((!assignmentDetails.TeamJson.Designer || !assignmentDetails.TeamJson.Animator || !assignmentDetails.TeamJson.Sales) && !fetchAssignmentIdDetails.fetchAssignmentIdDetails.ID) {
            setValidationFlag(false);

        } else {
            setValidationFlag(true);
        }
    };

    const assignAssignment = (e) => {
        e.preventDefault();
        validateForm();
        showLoading();

        if (validationFlag) {
            console.log("Assigned");
        }
    };

    return (
        <div>

            <Navbar
                userName={loggedUserDetails.loggedUser.Employee_Name}
                role={loggedUserDetails.loggedUser.Roles}
                rating={loggedUserDetails.loggedUser.Rating}
            />

            <form onSubmit={assignAssignment} className='grid grid-flow-rows gap-3 justify-items-center border border-slate-300 rounded-lg bg-sky-50 sm:ml-4 sm:mr-4 mt-5 sm:py-4 text-gray-500'>
                <span className='text-2xl text-gray-700 font-bold mt-4 mb-4'>Assign Assignment</span>


                <div>
                    <InputField
                        label="Assignment Title"
                        name="Assignment_Title"
                        id="Assignment_Title"
                        type="text"
                        placeholder="eg.: Game app"
                        value={assignmentDetails.Assignment_Title}
                        onChange={(e) => {
                            setAssignmentDetails((prevSetDetails) => ({
                                ...prevSetDetails,
                                Assignment_Title: e.target.value
                            }));
                        }}
                    />
                    {
                        !assignmentDetails.Assignment_Title && !validationFlag && !loader &&
                        <ValidationErrorMsg
                            validationMsg="Assignment title required"
                        />
                    }
                </div>

                <div className='grid sm:grid-cols-4 gap-2 font-bold'>
                    <label className='col-span-2 text-right text-lg'>Assignment Type:</label>
                    <label>
                        <input
                            type="radio"
                            value="New"
                            checked={assignmentDetails.Assignment_Type === "New"}
                            onChange={(e) => {
                                setAssignmentDetails((prevSetDetails) => ({
                                    ...prevSetDetails,
                                    Assignment_Type: e.target.value
                                }));
                            }}
                        /> New
                    </label>

                    <label>
                        <input
                            type="radio"
                            value="Changes"
                            checked={assignmentDetails.Assignment_Type === "Changes"}
                            onChange={(e) => {
                                setAssignmentDetails((prevSetDetails) => ({
                                    ...prevSetDetails,
                                    Assignment_Type: e.target.value
                                }));
                            }}
                        /> Changes
                    </label>
                </div>

                {
                    fetchAssignmentIdDetails.fetchAssignmentIdDetails.ID &&

                    <div className='grid sm:grid-cols-6 gap-2 font-bold'>

                        <label className='col-span-3 text-right text-lg'>Assignment Status:</label>
                        <label>
                            <input
                                type="radio"
                                value="Not Started"
                                checked={assignmentDetails.Assignment_Status === "Not Started"}
                                onChange={(e) => {
                                    setAssignmentDetails((prevSetDetails) => ({
                                        ...prevSetDetails,
                                        Assignment_Status: e.target.value
                                    }));
                                }}
                            /> Not Started
                        </label>

                        <label>
                            <input
                                type="radio"
                                value="WIP"
                                checked={assignmentDetails.Assignment_Status === "WIP"}
                                onChange={(e) => {
                                    setAssignmentDetails((prevSetDetails) => ({
                                        ...prevSetDetails,
                                        Assignment_Status: e.target.value
                                    }));
                                }}
                            /> WIP
                        </label>

                        <label>
                            <input
                                type="radio"
                                value="Completed"
                                checked={assignmentDetails.Assignment_Status === "Completed"}
                                onChange={(e) => {
                                    setAssignmentDetails((prevSetDetails) => ({
                                        ...prevSetDetails,
                                        Assignment_Status: e.target.value
                                    }));
                                }}
                            /> Completed
                        </label>
                        <div>
                        </div>

                    </div>
                }

                <div>
                    <InputField
                        label="Created Date"
                        name="Created_Date"
                        id="Created_Date"
                        type="date"
                        placeholder="Select Created Date"
                        min={!fetchAssignmentIdDetails.fetchAssignmentIdDetails.ID ? new Date().toISOString().split('T')[0] : ""}
                        value={assignmentDetails.Created_Date}
                        onChange={(e) => {
                            setAssignmentDetails((prevSetDetails) => ({
                                ...prevSetDetails,
                                Created_Date: e.target.value,
                                Started_Date: "",
                                Completion_Date: ""
                            }));
                        }}
                    />
                    {
                        !assignmentDetails.Created_Date && !validationFlag && !loader &&
                        <ValidationErrorMsg
                            validationMsg="Created date required"
                        />
                    }
                </div>


                <div>
                    <InputField
                        label="Starting Date"
                        name="Started_Date"
                        id="Started_Date"
                        type="date"
                        placeholder="Select Starting Date"
                        min={assignmentDetails.Created_Date}
                        value={assignmentDetails.Started_Date}
                        onChange={(e) => {
                            setAssignmentDetails((prevSetDetails) => ({
                                ...prevSetDetails,
                                Started_Date: e.target.value
                            }));
                        }}
                    />
                    {
                        !assignmentDetails.Started_Date && !validationFlag && !loader &&
                        <ValidationErrorMsg
                            validationMsg="Started date required"
                        />
                    }
                </div>

                <div>
                    <InputField
                        label="Completion Date"
                        name="Completion_Date"
                        id="Completion_Date"
                        type="date"
                        placeholder="Select Completion Date"
                        min={assignmentDetails.Created_Date}
                        value={assignmentDetails.Completion_Date}
                        onChange={(e) => {
                            setAssignmentDetails((prevSetDetails) => ({
                                ...prevSetDetails,
                                Completion_Date: e.target.value
                            }));
                        }}
                    />
                    {
                        !assignmentDetails.Completion_Date && !validationFlag && !loader &&
                        <ValidationErrorMsg
                            validationMsg="Completion date required"
                        />
                    }
                </div>

                {
                    !fetchAssignmentIdDetails.fetchAssignmentIdDetails.ID &&
                    <div className='grid grid-flow-cols justify-items-center gap-2 border border-slate-300 rounded-lg py-2 pr-2 pl-2 sm:ml-16'>

                        <div className='text-sm font-semibold'>{"Assign Team (max 3 employees per role) :"}</div>

                        <div className='grid grid-flow-rows gap-2 text-right'>
                            {
                                roleProfilesArr.map((role, index) =>
                                    <div className='grid grid-cols-6 gap-2 h-10' key={index}>
                                        <label className='font-bold grid content-center'>{role}</label>
                                        <input
                                            className='py-1 pl-2 border border-slate-300 rounded text-black
                                            transition duration-500 ease-in-out hover:scale-95'
                                            name={role + " count"}
                                            id={index}
                                            type='number'
                                            min={1}
                                            max={3}
                                            onChange={(e) => {
                                                e.target.id === "0" ?
                                                    (e.target.value > e.target.max || e.target.value < e.target.min || e.target.value[1]) ?
                                                        setAnimatorsCount('')
                                                        :
                                                        setAnimatorsCount(e.target.value)
                                                    : e.target.id === "1" ?
                                                        (e.target.value > e.target.max || e.target.value < e.target.min || e.target.value[1]) ?
                                                            setDesignersCount('')
                                                            :
                                                            setDesignersCount(e.target.value)
                                                        : e.target.id === "2" &&
                                                            (e.target.value > e.target.max || e.target.value < e.target.min || e.target.value[1]) ?
                                                            setSalesCount('')
                                                            :
                                                            setSalesCount(e.target.value)
                                            }}
                                            value={
                                                index === 0 ?
                                                    animatorsCount
                                                    : index === 1 ?
                                                        designersCount
                                                        : index === 2 &&
                                                        salesCount
                                            }
                                        />
                                        <textarea
                                            id={index}
                                            className='col-span-4 py-1 pl-2 border border-slate-300 rounded text-black
                                            transition duration-500 ease-in-out hover:scale-95'
                                            placeholder='enter count to show auto assigned team'
                                            value={
                                                index === 0 ?
                                                    assignmentDetails.TeamJson.Animator
                                                    : index === 1 ?
                                                        assignmentDetails.TeamJson.Designer
                                                        : index === 2 ?
                                                            assignmentDetails.TeamJson.Sales
                                                            :
                                                            ""
                                            }
                                        />
                                    </div>
                                )
                            }
                        </div>

                        {
                            (!assignmentDetails.TeamJson.Designer || !assignmentDetails.TeamJson.Animator || !assignmentDetails.TeamJson.Sales) && !validationFlag && !loader &&
                            <ValidationErrorMsg
                                validationMsg="All team entries required"
                            />
                        }

                        {
                            !loaderAutoAsign ?
                                <ButtonMain name="addteam" buttonLable="Add team members" onClick={(e) => autoAssignTeam(e)} />
                                :
                                <Loader />
                        }

                    </div>
                }

                <span className='text-lg font-medium'> Project Manager: <span className='font-bold text-black'>{loggedUserDetails.loggedUser.Employee_Name}</span></span>

                {
                    !fetchAssignmentIdDetails.fetchAssignmentIdDetails.ID ?
                        <div>
                            {
                                !loader ?
                                    <ButtonMain name="assignButton" buttonLable="Assign" />
                                    :
                                    <Loader />
                            }
                        </div>
                        :
                        <div>
                            {
                                !loader ?
                                    <ButtonMain name="assignButton" buttonLable="Update" />
                                    :
                                    <Loader />
                            }
                        </div>
                }

            </form>
        </div>
    )
}

export default AsignAssignment