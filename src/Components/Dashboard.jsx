import React, { useState, useContext } from 'react'
import { LoggedUserDetails, RolesArr, AssignmentTypeArr, EmployeeData, AssignmentData } from '../App'
import Navbar from './Navbar'
import Statusbar from './Statusbar'
import ButtonMain from './ButtonMain'
import EmployeeDetailsPlate from './EmployeeDetailsPlate'
import AssignmentDetailsPlate from './AssignmentDetailsPlate'
import OverviewPlate from './OverviewPlate'

const Dashboard = () => {

  const loggedUserDetails = useContext(LoggedUserDetails);
  const rolesArr = useContext(RolesArr);
  const assignmentTypeArr = useContext(AssignmentTypeArr);
  const employeeData = useContext(EmployeeData);
  const assignmentData = useContext(AssignmentData);

  // Arr STATES for top 3 employees wrt roles
  const [designersArr, setDesignersArr] = useState(
    employeeData.filter(employee => employee.Roles === 'Designer')
      .sort((b, a) => parseFloat(a.Rating) - parseFloat(b.Rating))
      .slice(0, 3)
  );

  const [animatorsArr, setAnimatorsArr] = useState(
    employeeData.filter(employee => employee.Roles === 'Animator')
      .sort((b, a) => parseFloat(a.Rating) - parseFloat(b.Rating))
      .slice(0, 3)
  );

  const [salesArr, setSalesArr] = useState(
    employeeData.filter(employee => employee.Roles === 'Sales')
      .sort((b, a) => parseFloat(a.Rating) - parseFloat(b.Rating))
      .slice(0, 3)
  );

  // Arr of employee roles who have no assignments in hand (WIP = 0) 
  const designersWIPArr = employeeData.filter(employee => employee.Roles === 'Designer' && employee.WIP === "0");
  const animatorsWIPArr = employeeData.filter(employee => employee.Roles === 'Animator' && employee.WIP === "0");
  const salesWIPArr = employeeData.filter(employee => employee.Roles === 'Sales' && employee.WIP === "0");

  // Arr of assignments wrt assignment types 
  const wipAssignmentsArr = assignmentData.filter(assignment => assignment.Assignment_Status === 'WIP');
  const wipAssignmentsArrPmBased = assignmentData.filter(assignment => assignment.Assignment_Status === 'WIP' && assignment.Project_Manager === loggedUserDetails.loggedUser.Employee_Name);

  const notStartedAssignmentsArr = assignmentData.filter(assignment => assignment.Assignment_Status === 'Not Started');
  const notStartedAssignmentsArrPmBased = assignmentData.filter(assignment => assignment.Assignment_Status === 'Not Started' && assignment.Project_Manager === loggedUserDetails.loggedUser.Employee_Name);

  const completedAssignmentsArr = assignmentData.filter(assignment => assignment.Assignment_Status === 'Completed');
  const completedAssignmentsArrPmBased = assignmentData.filter(assignment => assignment.Assignment_Status === 'Completed' && assignment.Project_Manager === loggedUserDetails.loggedUser.Employee_Name);

  const assignmentArrPmBased = assignmentData.filter(assignment => assignment.Project_Manager === loggedUserDetails.loggedUser.Employee_Name);


  // Arr of employees wrt roles 
  const hrEmployeesArr = employeeData.filter(employee => employee.Roles === 'HR');
  const pmEmployeesArr = employeeData.filter(employee => employee.Roles === 'Project Manager');
  const designerEmployeesArr = employeeData.filter(employee => employee.Roles === 'Designer');
  const animatorEmployeesArr = employeeData.filter(employee => employee.Roles === 'Animator');
  const salesEmployeesArr = employeeData.filter(employee => employee.Roles === 'Sales');

  // States for employee role / assignment type based button click for left display panel 
  const [roleBasedEmployeeArr, setRoleBasedEmployeeArr] = useState(employeeData.filter(employee => employee.Roles === 'HR'));
  const [typeBasedAssignmentArr, setTypeBasedAssignmentArr] = useState(assignmentData.filter(assignment => assignment.Assignment_Status === 'WIP' && assignment.Project_Manager === loggedUserDetails.loggedUser.Employee_Name));

  // States for displaying teams on click of team
  const [teamDesigners, setTeamDesigners] = useState();
  const [teamAnimators, setTeamAnimators] = useState();
  const [teamSales, setTeamSales] = useState();

  const [teamDesignersRatings, setTeamDesignersRatings] = useState();
  const [teamAnimatorsRatings, setTeamAnimatorsRatings] = useState();
  const [teamSalesRatings, setTeamSalesRatings] = useState();

  const [assignmentDisplayTitle, setAssignmentDisplayTitle] = useState('');

  const showTopEmployees = () => {
    setDesignersArr(employeeData.filter(employee => employee.Roles === 'Designer')
      .sort((b, a) => parseFloat(a.Rating) - parseFloat(b.Rating))
      .slice(0, 3)
    )

    setAnimatorsArr(employeeData.filter(employee => employee.Roles === 'Animator')
      .sort((b, a) => parseFloat(a.Rating) - parseFloat(b.Rating))
      .slice(0, 3)
    )

    setSalesArr(employeeData.filter(employee => employee.Roles === 'Sales')
      .sort((b, a) => parseFloat(a.Rating) - parseFloat(b.Rating))
      .slice(0, 3)
    )
  };

  const showBottomEmployees = () => {
    setDesignersArr(employeeData.filter(employee => employee.Roles === 'Designer')
      .sort((a, b) => parseFloat(a.Rating) - parseFloat(b.Rating))
      .slice(0, 3)
    )

    setAnimatorsArr(employeeData.filter(employee => employee.Roles === 'Animator')
      .sort((a, b) => parseFloat(a.Rating) - parseFloat(b.Rating))
      .slice(0, 3)
    )

    setSalesArr(employeeData.filter(employee => employee.Roles === 'Sales')
      .sort((a, b) => parseFloat(a.Rating) - parseFloat(b.Rating))
      .slice(0, 3)
    )
  };

  const showRoleBasedEmployees = (roleName) => {
    const storeRoleBasedEmployee = employeeData.filter(employee => employee.Roles === roleName)
    setRoleBasedEmployeeArr(storeRoleBasedEmployee);
  };

  const showTypeBasedAssignments = (type) => {
    const storeTypeBasedAssignments = assignmentData.filter(assignment => assignment.Assignment_Status === type && assignment.Project_Manager === loggedUserDetails.loggedUser.Employee_Name)
    setTypeBasedAssignmentArr(storeTypeBasedAssignments);
  };

  const showTeam = (teamJson, assignmentTitle) => {
    const teamDesigners = teamJson.Designer.split(',');
    const teamAnimators = teamJson.Animator.split(',');
    const teamSales = teamJson.Sales.split(',');

    setTeamDesigners(teamDesigners);
    setTeamAnimators(teamAnimators);
    setTeamSales(teamSales);
    setAssignmentDisplayTitle(assignmentTitle);

    const getTeamRatings = (teamArray) => {
      return teamArray.map(employeeName => {
        const employee = employeeData.find(employee => employee.Employee_Name === employeeName);
        return employee ? employee.Rating : null;
      });
    };

    setTeamDesignersRatings(getTeamRatings(teamDesigners));
    setTeamAnimatorsRatings(getTeamRatings(teamAnimators));
    setTeamSalesRatings(getTeamRatings(teamSales));
  };

  return (

    <div className='grid sm:grid-flow-cols gap-1'>

      <Navbar
        userName={loggedUserDetails.loggedUser.Employee_Name}
        role={loggedUserDetails.loggedUser.Roles}
        rating={loggedUserDetails.loggedUser.Rating}
      />

      {/* Status Bar */}

      {
        loggedUserDetails.loggedUser.Roles === "HR" ?

          <div className='border border-slate-300 rounded-lg bg-sky-50 grid grid-cols-2 gap-2 sm:ml-4 sm:mr-4 mt-2 sm:py-4'>

            <Statusbar
              statusTitle="Employees"
              statusCount={employeeData.length}
              statusIndex={rolesArr}
              statuslengthArr={[hrEmployeesArr.length, pmEmployeesArr.length, salesEmployeesArr.length, animatorEmployeesArr.length, designerEmployeesArr.length]}
            />

            <Statusbar
              statusTitle="Assignments"
              statusCount={assignmentData.length}
              statusIndex={assignmentTypeArr}
              statuslengthArr={[completedAssignmentsArr.length, wipAssignmentsArr.length, notStartedAssignmentsArr.length]}
            />
          </div>

          : loggedUserDetails.loggedUser.Roles === "Project Manager" &&

          <div className='border border-slate-300 rounded-lg bg-sky-50 grid grid-cols-2 gap-2 sm:ml-4 sm:mr-4 mt-2 sm:py-4'>
            <Statusbar
              statusTitle="Assignments"
              statusCount={assignmentArrPmBased.length}
              statusIndex={assignmentTypeArr}
              statuslengthArr={[completedAssignmentsArrPmBased.length, wipAssignmentsArrPmBased.length, notStartedAssignmentsArrPmBased.length]}
            />
          </div>
      }

      {/* Dasboard panel */}
      <div className='border border-slate-300 rounded-lg bg-sky-50 grid sm:grid-cols-3 gap-2 sm:ml-4 sm:mr-4 py-5 sm:pl-4 sm:pr-4'>

        {/* Dasboard left */}
        <div className='grid sm:grid-flow-cols gap-2'>

          {
            loggedUserDetails.loggedUser.Roles === "HR" ?

              <div className='grid sm:grid-cols-3 gap-2'>
                <div className='grid grid-flow-row gap-1 sm:h-full sm:max-h-48'>
                  {
                    rolesArr.map((role, index) =>
                      <ButtonMain
                        name={role}
                        buttonLable={role}
                        key={index}
                        onClick={(e) => showRoleBasedEmployees(e.target.name)}
                      />
                    )
                  }
                </div>

                <div className='col-span-2 h-96 overflow-auto rounded-lg drop-shadow-lg border-t-4 border-sky-50'>
                  {
                    roleBasedEmployeeArr.map((employee, index) =>
                      <EmployeeDetailsPlate
                        key={index}
                        employeeIdDetails={employee}
                        employeeName={employee.Employee_Name}
                        rating={employee.Rating}
                        contactNo={employee.Phone_No}
                        email={employee.Email}
                      />
                    )
                  }
                </div>
              </div>

              :

              <div className='grid sm:grid-rows-3 gap-1 sm:h-full sm:max-h-40'>
                <div className='grid grid-flow-col justify-self-center gap-1 sm:h-10'>
                  {
                    assignmentTypeArr.map((assignType, index) =>
                      <ButtonMain
                        name={assignType}
                        buttonLable={assignType}
                        key={index}
                        onClick={(e) => showTypeBasedAssignments(e.target.name)}
                      />
                    )
                  }
                </div>

                <div className='row-span-2 h-96 overflow-auto rounded-lg drop-shadow-lg border-t-4 border-sky-50'>
                  {
                    typeBasedAssignmentArr.map((assignment, index) =>

                      <AssignmentDetailsPlate
                        key={index}
                        assignmentIdDetails={assignment}
                        assignmentTitle={assignment.Assignment_Title}
                        createdDate={assignment.Created_Date}
                        startedDate={assignment.Started_Date}
                        completionDate={assignment.Completion_Date}
                        assignmentType={assignment.Assignment_Type}
                        onClickTeam={() => showTeam(assignment.TeamJson, assignment.Assignment_Title)}
                      />

                    )
                  }
                </div>
              </div>
          }
        </div>

        {/* Dasboard right */}
        <div className='col-span-2'>
          {
            loggedUserDetails.loggedUser.Roles === "HR" ?

              <div className='grid grid-rows-2'>

                <OverviewPlate
                  overviewTitle="Performers"
                  buttonRequired={true}
                  buttonName1="top"
                  buttonLable1="Top 3"
                  onClickButton1={() => showTopEmployees()}
                  buttonName2="bottom"
                  buttonLable2="Bottom 3"
                  onClickButton2={() => showBottomEmployees()}
                  listTitle1="Designers"
                  listTitle2="Animators"
                  listTitle3="Sales"
                  loggedRole={loggedUserDetails.loggedUser.Roles}
                  listingContentArr1={[designersArr[0].Employee_Name, designersArr[1].Employee_Name, designersArr[2].Employee_Name]}
                  listingContentArr2={[animatorsArr[0].Employee_Name, animatorsArr[1].Employee_Name, animatorsArr[2].Employee_Name]}
                  listingContentArr3={[salesArr[0].Employee_Name, salesArr[1].Employee_Name, salesArr[2].Employee_Name]}
                  ratingRequired={true}
                  ratingListArr1={[designersArr[0].Rating, designersArr[1].Rating, designersArr[2].Rating]}
                  ratingListArr2={[animatorsArr[0].Rating, animatorsArr[1].Rating, animatorsArr[2].Rating]}
                  ratingListArr3={[salesArr[0].Rating, salesArr[1].Rating, salesArr[2].Rating]}
                />

                <OverviewPlate
                  overviewTitle="Employee Data"
                  buttonRequired={false}
                  listTitle1="Roles with no in hand assignment"
                  listTitle2="All Assignments"
                  listTitle3="Hire more..."
                  loggedRole={loggedUserDetails.loggedUser.Roles}
                  listingContentArr1={["Designers " + designersWIPArr.length, "Animators " + animatorsWIPArr.length, "Sales " + salesWIPArr.length]}
                  listingContentArr2={["WIP " + wipAssignmentsArr.length, "Not Started " + notStartedAssignmentsArr.length, "Completed " + completedAssignmentsArr.length]}
                  listingContentArr3={''}
                />
              </div>

              :

              <div className='grid grid-rows-3'>
                <div className='col-span-2'>
                  <OverviewPlate
                    overviewTitle={assignmentDisplayTitle ? assignmentDisplayTitle : "Click 'Team' button to show team of respective projects below"}
                    listTitle1="Designers"
                    listTitle2="Animators"
                    listTitle3="Sales"
                    listingContentArr1={teamDesigners ? [teamDesigners[0], teamDesigners[1], teamDesigners[2]] : []}
                    listingContentArr2={teamAnimators ? [teamAnimators[0], teamAnimators[1], teamAnimators[2]] : []}
                    listingContentArr3={teamSales ? [teamSales[0], teamSales[1], teamSales[2]] : []}
                    loggedRole={loggedUserDetails.loggedUser.Roles}
                    ratingRequired={true}
                    ratingListArr1={teamDesignersRatings ? [teamDesignersRatings[0], teamDesignersRatings[1], teamDesignersRatings[2]] : []}
                    ratingListArr2={teamAnimatorsRatings ? [teamAnimatorsRatings[0], teamAnimatorsRatings[1], teamAnimatorsRatings[2]] : []}
                    ratingListArr3={teamSalesRatings ? [teamSalesRatings[0], teamSalesRatings[1], teamSalesRatings[2]] : []}
                  />
                </div>

              </div>
          }
        </div>
      </div>
    </div>
  )
}

export default Dashboard