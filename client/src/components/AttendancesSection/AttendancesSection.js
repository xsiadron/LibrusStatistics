import "./AttendancesSection.css"
import ProgressBar from "../ProgressBar/ProgressBar"

const AttendancesSection = ({ attendancesData }) => {
    const attendancePercentage = (attendancesData.Summary[2]["Obecność"] / attendancesData.Summary[2]["Quantity"]) * 100;

    return (<div className="attendances-section">
        <ProgressBar color={"#51FF35"} percentage={attendancePercentage} />
    </div>)
}

export default AttendancesSection;