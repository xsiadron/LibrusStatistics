import CountUp from 'react-countup';
import "./ProgressBar.css"

const ProgressBar = ({ percentage }) => {
    percentage = parseFloat(percentage).toFixed(0);

    function generateGradient(value) {
        const startColor = [255, 65, 65];
        const endColor = [46, 231, 15];

        const r = Math.round(startColor[0] - ((startColor[0] - endColor[0]) * value) / 100);
        const g = Math.round(startColor[1] - ((startColor[1] - endColor[1]) * value) / 100);
        const b = Math.round(startColor[2] - ((startColor[2] - endColor[2]) * value) / 100);

        return `rgb(${r}, ${g}, ${b})`;
    }

    let color = generateGradient(percentage);

    const progressStyle = {
        backgroundColor: color,
        maxWidth: `${percentage}%`,
        height: "100%",
        position: "absolute",
        left: 0,
    }

    return (<div className="progress-bar">
        <span className="progress-bar-title">
            <CountUp end={percentage} duration={0.5} suffix="%" easingFn={(t, b, c, d) => c * t / d + b} />
        </span>
        <div style={progressStyle} className="progress">
        </div>
    </div>)
}

export default ProgressBar;