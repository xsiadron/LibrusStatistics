import CountUp from 'react-countup';
import "./GradesAveragesSection.css"
import infoCircleIcon from '../../icons/info-circle.svg';

const GradesAveragesSection = ({ gradesData, semester }) => {
    if (!gradesData.length > 0) return (
        <div className="grades-averages">
            <img src={infoCircleIcon} alt="informacja" height={15} />
            <p>Brak ocen dla tego przedmiotu</p>
        </div>);

    const gradesTable = {
        "0": 0,
        "1": 1,
        "1+": 1.5,
        "2-": 1.75,
        "2": 2,
        "2+": 2.5,
        "3-": 2.75,
        "3": 3,
        "3+": 3.5,
        "4-": 3.75,
        "4": 4,
        "4+": 4.5,
        "5-": 4.75,
        "5": 5,
        "5+": 5.5,
        "6-": 5.75,
        "6": 6
    }

    function calculateAverage(grades) {
        let filteredGrades = grades.filter((grade) => grade.GradeCountToTheAverage === true && gradesTable[grade.Grade] !== 0);
        filteredGrades = filteredGrades.filter((grade) => gradesTable[grade.Grade] != null);

        if (filteredGrades.length === 0) return "-";

        const sumOfWeights = filteredGrades.reduce((sum, grade) => sum + grade.GradeWeight, 0);
        const sumOfGradesWithWeights = filteredGrades.reduce((sum, grade) => sum + (gradesTable[grade.Grade] * grade.GradeWeight), 0);

        const average = sumOfGradesWithWeights / sumOfWeights;

        return average.toFixed(2);
    }

    function getProposedGrade(grades) {
        const proposedGrade = grades.find((grade) => grade.IsSemesterProposition === true);

        if (!proposedGrade) {
            return "-";
        }

        return proposedGrade.Grade;
    }

    function getFinalGrade(grades) {
        const finalGrade = grades.find((grade) => grade.IsFinal === true);

        if (!finalGrade) {
            return "-";
        }

        return finalGrade.Grade;
    }

    function getSemesterGrade(grades) {
        const semestralGrade = grades.find((grade) => grade.IsSemester === true);

        if (!semestralGrade) {
            return "-";
        }

        return semestralGrade.Grade;
    }

    function CountUpOrString(end) {
        if (!parseInt(end)) return "-";
        return (<CountUp end={end} decimals={2} duration={0.8} easingFn={(t, b, c, d) => c * t / d + b} />)
    }

    const grades = Object.values(gradesData);

    if (semester == 0) {
        const finalAverage = calculateAverage(grades);
        const proposedFinalGrade = getProposedGrade(grades);
        const finalGrade = getFinalGrade(grades);

        return (<div className="grades-averages">

            <table>
                <tbody>
                    <tr>
                        <th>Roczna</th>
                    </tr>
                    <tr>
                        <td>Średnia: {CountUpOrString(finalAverage)}</td>
                        <td>Proponowana: {CountUpOrString(proposedFinalGrade)}</td>
                        <td>Wystawiona: {CountUpOrString(finalGrade)}</td>
                    </tr>
                </tbody>
            </table>
        </div>)
    }

    const proposedAverage = calculateAverage(grades);
    const proposedGrade = getProposedGrade(grades);
    const semesterGrade = getSemesterGrade(grades);

    return (<div className="grades-averages">

        <table>
            <tbody>
                <tr>
                    <th>Semestralna</th>
                </tr>
                <tr>
                    <td>Średnia: {CountUpOrString(proposedAverage)}</td>
                    <td>Proponowana: {CountUpOrString(proposedGrade)}</td>
                    <td>Wystawiona: {CountUpOrString(semesterGrade)}</td>
                </tr>
            </tbody>
        </table>
    </div>)
}

export default GradesAveragesSection;