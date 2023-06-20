import "./GradesAveragesSection.css"

const GradesAveragesSection = ({ gradesData }) => {

    if(!gradesData.length > 0) return "";

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
        let filteredGrades = grades.filter((grade) => grade.GradeCountToTheAverage === true);
        filteredGrades = filteredGrades.filter((grade) => gradesTable[grade.Grade] != null);

        if (filteredGrades.length === 0) return "-";

        const sumOfWeights = filteredGrades.reduce((sum, grade) => sum + grade.GradeWeight, 0);
        const sumOfGradesWithWeights = filteredGrades.reduce((sum, grade) => sum + (gradesTable[grade.Grade] * grade.GradeWeight), 0);

        const average = sumOfGradesWithWeights / sumOfWeights;

        return average.toFixed(2);
    }

    function getFinalGrade(grades) {
        const finalGrade = grades.find((grade) => grade.IsFinal === true);

        if (!finalGrade) {
            return "-";
        }

        return finalGrade.Grade;
    }

    const grades = Object.values(gradesData);

    const proposedAverage = calculateAverage(grades);
    const finalAverage = 0;
    const proposedGrade = 0;
    const finalGrade = getFinalGrade(grades);

    return (<div className="grades-averages">

        <table>
            <tbody>
                <tr>
                    <th>Semestralna</th>
                </tr>
                <tr>
                    <td>Średnia: {proposedAverage}</td>
                    <td>Proponowana: {proposedAverage}</td>
                    <td>Wystawiona: {finalGrade} </td>
                </tr>
            </tbody>
        </table>
    </div>)
}

export default GradesAveragesSection;