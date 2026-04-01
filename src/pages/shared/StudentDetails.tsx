import { useParams } from 'react-router-dom';

const StudentDetails = () => {
    const { studentId } = useParams<{ studentId: string }>();

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Détails de l'étudiant</h1>
            <p>ID de l'étudiant: {studentId}</p>
            {/* Add more student details here */}
        </div>
    );
};

export default StudentDetails;