import "./Grade.css"

export default function Grade({ grade, weight }) {
    const gradesColors = {
        "0": "CC1A1A",
        "1": "CC2D2D",
        "1+": "CC413A",
        "2-": "CC5237",
        "2": "CC6634",
        "2+": "CC772F",
        "3-": "CC882B",
        "3": "CC9926",
        "3+": "CCAA21",
        "4-": "CCBB1D",
        "4": "CCCC18",
        "4+": "CCDD14",
        "5-": "CCEF10",
        "5": "D1FF0C",
        "5+": "D2FF08",
        "6-": "D4FF05",
        "6": "D5FF00"
    };

    const gradeStyle = {
        backgroundColor: `#${gradesColors[grade]}`,
    }

    return (<div className="grade" style={gradeStyle}>
        <h1 className="grade-title">{grade}</h1>
        <h2 className="grade-weight">{weight}</h2>
    </div>)
}