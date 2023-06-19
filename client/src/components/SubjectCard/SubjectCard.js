import "./SubjectCard.css"
import DaysBar from "../DaysBar/DaysBar"
import GradesSection from "../GradesSection/GradesSection"
import AttendancesSection from "../AttendancesSection/AttendancesSection"
import GradesAveragesSection from "../GradesAveragesSection/GradesAveragesSection"

const SubjectCard = ({ name }) => {
    const data = JSON.parse(localStorage.getItem('data')).data;
    const grades = data[name]?.Grades[2] || {};
    const days = data[name]?.Days || [8];
    const attendances = data[name]?.Attendances;

    return (<div className="subject-card">
        <div>
            <div className="subject-card-text-div">
                <h1 className="subject-card-title">{name}</h1>
                <DaysBar days={days} />
            </div>
            <AttendancesSection attendancesData={attendances} />
        </div>

        <GradesSection name={name} />

        <GradesAveragesSection gradesData={grades} />


    </div>)
}

export default SubjectCard;