import "./GradesSection.css"
import Grade from "../Grade/Grade"

export default function GradesSection({ gradesData }) {
    if (!gradesData) return ("");
    return (<div className="subject-card-grades">
        {Object.keys(gradesData).map((gradeKey, index) => {
            if (gradesData[gradeKey].IsFinal || gradesData[gradeKey].IsFinalProposition || gradesData[gradeKey].IsSemester || gradesData[gradeKey].IsSemesterProposition) {
                return;
            }

            return (<Grade
                key={index}
                grade={gradesData[gradeKey].Grade}
                weight={gradesData[gradeKey].GradeWeight}
            />)
        })}
    </div>)
}