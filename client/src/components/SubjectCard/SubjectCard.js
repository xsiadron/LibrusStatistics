import "./SubjectCard.css"
import Grade from "../Grade/Grade"
import ProgressBar from "../ProgressBar/ProgressBar"

const SubjectCard = ({ name, days, attendancePercentage }) => {
    const data = JSON.parse(localStorage.getItem('data')).data;
    const grades = data[name]?.Grades[2] || {};

    return (<div className="subject-card">
        <div>
            <div className="subject-card-text-div">
                <h1 className="subject-card-title">{name}</h1>
                <h2 className="subject-card-days">{days}</h2>
            </div>
            <div className="attendance">
                {/* Progressbar with attendances*/}
                <ProgressBar color={"#51FF35"} percentage={attendancePercentage} />
            </div>
        </div>

        <div className="subject-card-grades">
            {Object.keys(grades).map((grade, index) => (
                <Grade
                    key={index}
                    grade={grades[grade].Grade}
                    weight={grades[grade].GradeWeight}
                />
            ))}
        </div>

        <table>
            <tbody>
                <tr>
                    <th>Semestralna</th>
                    <td>Średnia: 3.58</td>
                    <td>Wystawiona: 3</td>
                </tr>
                <tr>
                    <th>Roczna</th>
                    <td>Średnia: 4.82</td>
                    <td>Wystawiona: 4</td>
                </tr>
            </tbody>
        </table>
    </div>)
}

export default SubjectCard;