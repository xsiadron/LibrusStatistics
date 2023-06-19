import "./SubjectCard.css"
import ProgressBar from "../ProgressBar/ProgressBar"
import DaysBar from "../DaysBar/DaysBar"
import GradesSection from "../GradesSection/GradesSection"

const SubjectCard = ({ name, attendancePercentage }) => {
    const data = JSON.parse(localStorage.getItem('data')).data;
    const grades = data[name]?.Grades[2] || {};
    const days = data[name]?.Days || [8];

    return (<div className="subject-card">
        <div>
            <div className="subject-card-text-div">
                <h1 className="subject-card-title">{name}</h1>
                <DaysBar days={days} />
            </div>
            <div className="attendance">
                <ProgressBar color={"#51FF35"} percentage={attendancePercentage} />
            </div>
        </div>

        <GradesSection name={name} />

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