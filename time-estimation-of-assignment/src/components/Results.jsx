import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function Results(){
    const [assignment, setAssignment] = useState(null);
    const { userId } = useParams();

    useEffect(()=> {
        const fetchAssignment = async () => {
            const response = await axios.get(`http://localhost:5000/api/assignments/${userId}`);
            setAssignment(response.data);
        };
        fetchAssignment();
    }, [userId]);

    return(
        <div>
            <h2>Estimated Time to Complete this Assignment</h2>
            {assignment && (
                <>
                <p>{assignment.estimatedTime.days} days and {assignment.estimatedTime.hours} hours</p>
                <p>Track your progress below:</p>
                {/* Add tracking functionality */}
                </>
            )}
        </div>
    )
}