import {User} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const StudentCard = ({id, student}) => {
    const navigate = useNavigate();
    const handleClick = () => {
        console.log(`Clicked student with ID: ${student._id}`);
        navigate(`/admin//students/${student._id}`);
    }

    return(
        <button onClick={handleClick} className="student-card-container" id={student._id}>
            <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                <div className="student-card-profile">
                    {student.profilePicture ? (
                        <img className="student-card-pic" src={student.profilePicture} alt={`${student.firstName} ${student.lastName}`} />
                    ) : (
                        <User />
                    )}
                </div>
                <h4>{student.firstName} {student.lastName}</h4>
            </div>

            <div className="student-card-email"><p>{student.email}</p></div>
            
            <div>{student.batchYear} - sem: {student.semester}</div>
            <div>
                <span style={{ color: student.status === 'Active' ? 'green' : 'red' }}>
                    {student.status}
                </span>
            </div>
        </button>
    )
}

export default StudentCard;