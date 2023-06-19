import "./GradesSection.css"
import Grade from "../Grade/Grade"

export default function GradesSection({ name }) {
    const data = JSON.parse(localStorage.getItem('data')).data;
    const grades = data[name]?.Grades[2] || {};

    return (<div className="subject-card-grades">
        {Object.keys(grades).map((gradeKey, index) => {
            if (grades[gradeKey].IsFinal || grades[gradeKey].IsFinalProposition || grades[gradeKey].IsSemester || grades[gradeKey].IsSemesterProposition) {
                return;
            }

            return (<Grade
                key={index}
                grade={grades[gradeKey].Grade}
                weight={grades[gradeKey].GradeWeight}
            />)
        })}
    </div>)
}