import "./Grade.css"

export default function Grade({ grade, weight }) {
    const gradesColors = {
        "0": "FF2D2D",
        "1": "FF4141",
        "1+": "FF5A3E",
        "2-": "FF733B",
        "2": "FF8C38",
        "2+": "FFA535",
        "3-": "FFBE32",
        "3": "FFD72F",
        "3+": "FFEF2C",
        "4-": "FFF829",
        "4": "F1FF26",
        "4+": "D9FF23",
        "5-": "C2FF20",
        "5": "AAFF1D",
        "5+": "93FF1A",
        "6-": "7BFF17",
        "6": "6EFF00"
    };

    const gradeStyle = {
        backgroundColor: `#${gradesColors[grade]}`,
    }

    return (<div className="grade" style={gradeStyle}>
        <h1 className="grade-title">{grade}</h1>
        <h2 className="grade-weight">{weight}</h2>
    </div>)
}