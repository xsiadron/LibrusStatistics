import "./AttendancesSection.css"
import ProgressBar from "../ProgressBar/ProgressBar"

const AttendancesSection = ({ attendancesData }) => {
    const attendances = attendancesData.Summary[2];
    const attendancePercentage = (attendances["Obecność"] / attendances["Quantity"]) * 100;
    let attendanceQuantity = attendances["Quantity"];

    let attendanceQuantityString = "";
    for (let attendance in attendances) {
        if (attendance != "Quantity") {
            if (attendance.toLowerCase() == "obecność") attendanceQuantityString += attendances[attendance] + "ob  "
            else if (attendance.toLowerCase() == "nieobecność") attendanceQuantityString += attendances[attendance] + "nb  "
            else if (attendance.toLowerCase() == "nieobecność usprawiedliwiona") attendanceQuantityString += attendances[attendance] + "nu  "
            else if (attendance.toLowerCase() == "spóźnienie") attendanceQuantityString += attendances[attendance] + "sp  "
        }
    }

    return (<div className="attendances-section">
        <ProgressBar color={"#51FF35"} percentage={attendancePercentage} />
        <p className="attendancesText">{attendanceQuantityString}</p>
    </div>)
}

export default AttendancesSection;