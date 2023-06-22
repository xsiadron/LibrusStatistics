import { useState } from 'react';
import "./styles/Home.css"
import "./styles/config.css"
import SubjectCard from "./components/SubjectCard/SubjectCard"

export default function Home() {
    const data = JSON.parse(localStorage.getItem('data')).data;
    const [displayedSemester, setDisplayedSemester] = useState(0);
    const [buttonIndex, setButtonIndex] = useState(0)

    const changeSemester = (e) => {
        let semester = e.target.dataset.value;
        setButtonIndex(semester);
        setDisplayedSemester(semester);
    }

    return (
        <>
            <main>
                <section className="sub-nav">
                    <button onClick={changeSemester} data-value="1" className={buttonIndex == 1 ? 'active-button' : ''}>Semestr 1</button>
                    <button onClick={changeSemester} data-value="2" className={buttonIndex == 2 ? 'active-button' : ''}>Semestr 2</button>
                    <button onClick={changeSemester} data-value="0" className={buttonIndex == 0 ? 'active-button' : ''}>Wszystkie</button>
                </section>
                <section className="subjects-cards">
                    {Object.keys(data).map((subjectKey, index) => {
                        return (
                            <SubjectCard
                                key={index}
                                name={subjectKey}
                                semester={displayedSemester}
                            />
                        );
                    })}
                </section>
            </main>
        </>
    )
}