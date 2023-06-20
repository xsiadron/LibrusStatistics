import React, { useEffect, useRef } from "react"
import "./SubjectCard.css"
import DaysBar from "../DaysBar/DaysBar"
import GradesSection from "../GradesSection/GradesSection"
import AttendancesSection from "../AttendancesSection/AttendancesSection"
import GradesAveragesSection from "../GradesAveragesSection/GradesAveragesSection"

const SubjectCard = ({ name }) => {
    const data = JSON.parse(localStorage.getItem('data')).data;
    const grades = data[name]?.Grades[2] || {};
    const days = data[name]?.Days || [8];
    const attendances = data[name]?.Attendances;
    const properties = data[name].Properties;

    const titleRef = useRef(null);
    useEffect(() => {
        const title = titleRef.current;
        if (title.innerHTML.length>45) {
            title.innerHTML = properties.ShortName;
        }
        else if (title.innerHTML.length>24) {
            title.classList.add("text-scroll-animation");
        }
    });

    return (<div className="subject-card">
        <div>
            <div className="subject-card-text-div">
                <div className="subject-card-title-div">
                    <h1 className="subject-card-title" ref={titleRef}>{name}</h1>
                </div>
                <DaysBar days={days} />
            </div>
            <AttendancesSection attendancesData={attendances} />
        </div>

        <GradesSection name={name} />

        <GradesAveragesSection gradesData={grades} />


    </div>)
}

export default SubjectCard;