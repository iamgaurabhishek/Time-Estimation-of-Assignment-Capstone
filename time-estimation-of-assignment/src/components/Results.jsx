import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function Results(){
    const [assignment, setAssignment] = useState(null);
    const { userId } = useParams();

    useEffect(() => {
        const fetchAssignment = async () => {
            try{
                const response = await axios.get(`http://localhost:5000/api/assignments/${userId}`);
                console.log("Fetched assignment", response.data);
                if(response.data.length > 0){
                    setAssignment(response.data[0]); // Assume you are working with the first assignment
                }
                else{
                    setAssignment(null); // No assignments found
                }
            }
            catch(err) {
                console.error("Error fetching assignment data: ",err);
            }
        };
        fetchAssignment();
    }, [userId]);

    if(!assignment) {
        return <p>No assignment found for this user.</p>;
    }


    return(
        <div>
            <h2>Estimated Time to Complete this Assignment</h2>
            {assignment.estimatedTime ? (
                <>
                    <p>{assignment.estimatedTime.days || 0} days and {assignment.estimatedTime.hours || 0} hours</p>
                    <p>Track your progress below:</p>
                {/* Add tracking functionality */}
                </>
            ): (
                <p>No estimated time found for this assignment.</p>
            )}
        </div>
    );
}