import CountUp from 'react-countup';
import "./AttendancesSection.css"
import ProgressBar from "../ProgressBar/ProgressBar"
const config = require("../../config/librus-config");

const AttendancesSection = ({ attendancesSummaryData }) => {
    let attendancePercentage = 0;
    let attendanceQuantity = 0;
    if (attendancesSummaryData && attendancesSummaryData["Quantity"]) {
        config.treatAsAttendance.forEach(treatAttendance => {
            if (attendancesSummaryData[config.attendaceTypes[treatAttendance]]) attendanceQuantity += attendancesSummaryData[config.attendaceTypes[treatAttendance]];
        });
        attendancePercentage = (attendanceQuantity / attendancesSummaryData["Quantity"]) * 100
    }

    function CountUpOrString(end, suffix) {
        if (end == 0 || !parseInt(end)) return "";
        return (<CountUp end={end} suffix={suffix + "&ensp;"} duration={0.8} easingFn={(t, b, c, d) => c * t / d + b} />)
    }

    let attendances = {};
    for (let attendance in attendancesSummaryData) {
        if (attendance != "Quantity") {
            if (attendance.toLowerCase() == "obecność") attendances["ob"] = attendancesSummaryData[attendance]
            else if (attendance.toLowerCase() == "nieobecność") attendances["nb"] = attendancesSummaryData[attendance]
            else if (attendance.toLowerCase() == "nieobecność usprawiedliwiona") attendances["u"] = attendancesSummaryData[attendance]
            else if (attendance.toLowerCase() == "spóźnienie") attendances["sp"] = attendancesSummaryData[attendance]
        }
    }

    return (<div className="attendances-section">
        <ProgressBar key={attendancePercentage} percentage={attendancePercentage} />
        <p className="attendancesText">
            {CountUpOrString(attendances["ob"], "ob")}
            {CountUpOrString(attendances["nb"], "nb")}
            {CountUpOrString(attendances["u"], "u")}
            {CountUpOrString(attendances["sp"], "sp")}
        </p>
    </div>)
}

export default AttendancesSection;