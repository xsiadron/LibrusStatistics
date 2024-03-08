import CountUp from 'react-countup';
import "./AttendancesSection.css"
import ProgressBar from "../ProgressBar/ProgressBar"

const AttendancesSection = ({ attendancesSummaryData }) => {
    const presence =
    (attendancesSummaryData["Obecność"] || 0) +
    (attendancesSummaryData["Obecność online"] || 0) +
    (attendancesSummaryData["Spóźnienie"] || 0);
    
    const attendancePercentage = (presence / attendancesSummaryData["Quantity"]) * 100;

    function CountUpOrString(end, suffix) {
        if (end == 0 || !parseInt(end)) return "";
        return (<CountUp end={end} suffix={suffix + "&ensp;"} duration={0.8} easingFn={(t, b, c, d) => c * t / d + b} />)
    }

    let attendances = {};
    for (let attendance in attendancesSummaryData) {
        if (attendance != "Quantity") {
            if (attendance.toLowerCase() == "obecność") attendances["ob"] = attendancesSummaryData[attendance]
            if (attendance.toLowerCase() == "obecność online") attendances["ob-o"] = attendancesSummaryData[attendance]
            else if (attendance.toLowerCase() == "nieobecność") attendances["nb"] = attendancesSummaryData[attendance]
            else if (attendance.toLowerCase() == "nieobecność online") attendances["nb-o"] = attendancesSummaryData[attendance]
            else if (attendance.toLowerCase() == "nieobecność usprawiedliwiona") attendances["u"] = attendancesSummaryData[attendance]
            else if (attendance.toLowerCase() == "zwolnienie") attendances["zw"] = attendancesSummaryData[attendance]
            else if (attendance.toLowerCase() == "spóźnienie") attendances["sp"] = attendancesSummaryData[attendance]
        }
    }

    return (<div className="attendances-section">
        <ProgressBar key={attendancePercentage} percentage={attendancePercentage} />
        <p className="attendancesText">
            {CountUpOrString(attendances["ob"], "ob")}
            {CountUpOrString(attendances["ob-o"], "ob-o")}
            {CountUpOrString(attendances["nb"], "nb")}
            {CountUpOrString(attendances["nb-o"], "nb-o")}
            {CountUpOrString(attendances["u"], "u")}
            {CountUpOrString(attendances["zw"], "zw")}
            {CountUpOrString(attendances["sp"], "sp")}
        </p>
    </div>)
}

export default AttendancesSection;