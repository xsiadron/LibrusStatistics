import "./AttendancesSection.css"
import ProgressBar from "../ProgressBar/ProgressBar"

const AttendancesSection = ({ attendancesSummaryData }) => {
    const attendancePercentage = (attendancesSummaryData["Obecność"] / attendancesSummaryData["Quantity"]) * 100;
    let attendanceQuantity = attendancesSummaryData["Quantity"];

    let attendanceQuantityString = "";
    for (let attendance in attendancesSummaryData) {
        if (attendance != "Quantity") {
            if (attendance.toLowerCase() == "obecność") attendanceQuantityString += attendancesSummaryData[attendance] + "ob  "
            else if (attendance.toLowerCase() == "nieobecność") attendanceQuantityString += attendancesSummaryData[attendance] + "nb  "
            else if (attendance.toLowerCase() == "nieobecność usprawiedliwiona") attendanceQuantityString += attendancesSummaryData[attendance] + "nu  "
            else if (attendance.toLowerCase() == "spóźnienie") attendanceQuantityString += attendancesSummaryData[attendance] + "sp  "
        }
    }

    return (<div className="attendances-section">
        <ProgressBar color={"#51FF35"} percentage={attendancePercentage} />
        <p className="attendancesText">{attendanceQuantityString}</p>
    </div>)
}

export default AttendancesSection;