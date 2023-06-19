import "./ProgressBar.css"

const ProgressBar = ({ color, percentage }) => {
    percentage = parseFloat(percentage).toFixed(0);

    const progressStyle = {
        backgroundColor: color,
        width: `${percentage}%`,
        height: "100%",
        position: "absolute",
        left: 0,
    }

    return (<div className="progress-bar">
        <span className="progress-bar-title">{`${percentage}%`}</span>
        <div style={progressStyle}>
        </div>
    </div>)
}

export default ProgressBar;