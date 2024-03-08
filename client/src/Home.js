import { useState } from 'react';
import "./styles/Home.css"
import "./styles/config.css"
import SubjectCard from "./components/SubjectCard/SubjectCard"

export default function Home() {
    const [data, setData] = useState(JSON.parse(localStorage.getItem('data')).data);

    const [displayedSemester, setDisplayedSemester] = useState(0);
    const [buttonIndex, setButtonIndex] = useState(0)

    const changeSemester = (e) => {
        let semester = e.target.dataset.value;
        setButtonIndex(semester);
        setDisplayedSemester(semester);
    }

    const changeDisplaySubjects = (e) => {
        if (e.target.classList.contains('active-button')) {
            e.target.classList.remove('active-button');

            let tempData = JSON.parse(localStorage.getItem('data')).data;
            for (let name in tempData) {
                if (tempData.hasOwnProperty(name) && JSON.stringify(tempData[name].Days) === '{}') {
                    delete tempData[name];
                }
            }
            setData(tempData);

        } else {
            e.target.classList.add('active-button');
            let tempData = JSON.parse(localStorage.getItem('data')).data;

            setData(tempData);
        }
    }

    return (
        <>
            <main>
                <section className="sub-nav">
                    <div className='group'>
                        <h1>{"{"}</h1>
                        <div>
                            <p>Ustawienia semestralne</p>
                            <button onClick={changeSemester} data-value="1" className={buttonIndex == 1 ? 'active-button' : ''}>Semestr 1</button>
                            <button onClick={changeSemester} data-value="2" className={buttonIndex == 2 ? 'active-button' : ''}>Semestr 2</button>
                            <button onClick={changeSemester} data-value="0" className={buttonIndex == 0 ? 'active-button' : ''}>Wszystkie</button>
                        </div>
                        <h1>{"}"}</h1>
                    </div>
                    <div className='group'>
                        <h1>{"{"}</h1>
                        <div>
                            <p>Ustawienia Wyświetlania</p>
                            <button onClick={changeDisplaySubjects} className='active-button'>Pokaż wszystkie przedmioty</button>
                        </div>
                        <h1>{"}"}</h1>
                    </div>
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