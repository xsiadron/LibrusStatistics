import "./DaysBar.css"

export default function DaysBar({ days }) {
    const daysOfWeek = {
        1: "pon.",
        2: "wt.",
        3: "śr.",
        4: "czw.",
        5: "pt.",
        6: "sob.",
        7: "niedz.",
        8: "Nie ma w planie lekcji"
    };

const uniqueDaysSet = new Set(days);
const sortedDays = [...uniqueDaysSet].sort((a, b) => a - b);
const daysString = sortedDays.map(day => daysOfWeek[day]).join("\t");

    return (<div className="subject-card-days">
        <p className="days">{daysString}</p>
    </div>)
}