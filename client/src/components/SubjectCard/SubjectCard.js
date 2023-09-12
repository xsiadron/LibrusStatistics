import React, { useEffect, useRef } from "react"
import "./SubjectCard.css"
import DaysBar from "../DaysBar/DaysBar"
import GradesSection from "../GradesSection/GradesSection"
import AttendancesSection from "../AttendancesSection/AttendancesSection"
import GradesAveragesSection from "../GradesAveragesSection/GradesAveragesSection"

const SubjectCard = ({ name, semester }) => {
    const data = JSON.parse(localStorage.getItem('data')).data;

    let grades;
    let days;
    let attendances;
    let properties;

    if (data[name].Grades) grades = data[name]?.Grades[semester] || {};
    if (data[name].Days) days = data[name]?.Days || [8];
    if (data[name].Attendances) attendances = data[name]?.Attendances.Summary[semester];
    if (data[name].Properties) properties = data[name].Properties;

    if (semester == 0) {
        let semestersGrades = data[name]?.Grades || [];
        let semestersAttendances = data[name]?.Attendances?.Summary || [];

        if (grades) grades = Object.values(semestersGrades).reduce((previousData, semesterGrade) => { return previousData.concat(semesterGrade); });

        attendances = Object.values(semestersAttendances).reduce((result, summary) => {
            for (const key in summary) {
                if (result[key]) {
                    result[key] += summary[key];
                } else {
                    result[key] = summary[key];
                }
            }
            return result;
        }, {});;
    }


    const titleRef = useRef(null);
    useEffect(() => {
        const title = titleRef.current;
        if (title.innerHTML.length > 45) {
            title.innerHTML = `skrót: ${properties.ShortName}`;
        }
        else if (title.innerHTML.length > 20) {
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
            <AttendancesSection attendancesSummaryData={attendances} />
        </div>

        <GradesSection gradesData={grades} />

        <GradesAveragesSection gradesData={grades} semester={semester} />


    </div>)
}

export default SubjectCard;