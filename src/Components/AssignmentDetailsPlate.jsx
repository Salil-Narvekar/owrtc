import React, { useContext } from 'react'
import { useNavigate } from "react-router-dom";
import { FetchAssignmentIdDetails } from '../App';
import ButtonSecondary from './ButtonSecondary';
import ButtonMain from './ButtonMain';

const AssignmentDetailsPlate = ({ assignmentIdDetails, assignmentTitle, createdDate, startedDate, completionDate, assignmentType, onClickTeam }) => {

    const navigate = useNavigate();
    const fetchAssignmentIdDetails = useContext(FetchAssignmentIdDetails);

    return (
        <div className='grid grid-rows-3 justify-items-start border border-slate-300 rounded-lg font-bold h-28 py-1 pl-2 pr-2 mb-1 '>

            <div className='grid justify-items-start'>
                <span className={ assignmentType === 'New' ?'text-lg text-cyan-600' : 'text-lg text-red-600' } >{assignmentTitle}</span>
            </div>

            <div className='grid grid-cols-3 gap-8 text-xs text-left font-medium -mt-1'>
                <div className='grid grid-col-2'>
                    <span>Created</span>
                    <span className='font-bold'>{createdDate}</span>
                </div>
                
                <div className='grid grid-col-2'>
                    <span>Started</span>
                    <span className='text-green-600 font-bold'>{startedDate}</span>
                </div>

                <div className='grid grid-col-2'>
                    <span>Deadline</span>
                    <span className='text-orange-500'>{completionDate}</span>
                </div>
            </div>

            <div className='grid grid-cols-3 gap-1 mt-1'>
                <ButtonSecondary 
                    name="videoCall" 
                    buttonLable="Video" 
                    size="small"
                    onClick={() => {
                        navigate('/videoCall')
                    }} 
                />

                <ButtonSecondary 
                    name="edit" 
                    buttonLable="Edit" 
                    size="small"
                    onClick={() => {
                        fetchAssignmentIdDetails.dispatch({ type: "fetchAssignmentIdDetails", value: assignmentIdDetails });
                        navigate('/asignNewAssignment')
                    }} 
                />

                <ButtonMain 
                    name="team" 
                    buttonLable="Team" 
                    size="small"
                    onClick={onClickTeam} 
                />
            </div>
        </div>
    )
}

export default AssignmentDetailsPlate