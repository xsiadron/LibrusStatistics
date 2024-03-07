import "./DaysBar.css";

export default function DaysBar({ days }) {
    const daysOfWeek = {
        1: "pon.",
        2: "wt.",
        3: "śr.",
        4: "czw.",
        5: "pt.",
        6: "sob.",
        7: "niedz.",
        8: "Brak w twoim planie",
    };

    let daysString;

    if (days && days.length > 0) {
        const uniqueDaysSet = new Set(days);
        const sortedDays = [...uniqueDaysSet].sort((a, b) => a - b);
        daysString = sortedDays.map((day) => daysOfWeek[day]).join("\t");
    } else {
        daysString = daysOfWeek[8];
    }

    return (
        <div className="subject-card-days">
            <p className="days">{daysString}</p>
        </div>
    );
}
