import { useState, useEffect, useRef } from 'react';
import "./styles/Home.css"
import "./styles/config.css"
import SubjectCard from "./components/SubjectCard/SubjectCard"

export default function Home() {
    const [displayedSemester, setDisplayedSemester] = useState(0);
    const [buttonIndex, setButtonIndex] = useState(0)
    const [showAll, setShowAll] = useState(false)

    const [searchValue, setSearchValue] = useState("");
    const inputRef = useRef();

    const [data, setData] = useState(filterData(JSON.parse(localStorage.getItem('data')).data, showAll, ""));

    useEffect(() => {
        if (localStorage.getItem("data")) {
            const tempData = JSON.parse(localStorage.getItem("data")).data;
            const newData = filterData(tempData, showAll, searchValue);
            setData(newData);
        }
    }, [displayedSemester, buttonIndex, showAll, searchValue]);

    useEffect(() => {
        setSearchValue(inputRef.current.value.toLowerCase());
    }, [displayedSemester, buttonIndex, showAll]);

    const changeSemester = (e) => {
        let semester = e.target.dataset.value;
        setButtonIndex(semester);
        setDisplayedSemester(semester);
    }

    const changeDisplaySubjectsButton = (e) => {
        if (!showAll) {
            e.target.classList.add("active");
        } else {
            e.target.classList.remove("active");
        }
        setShowAll(!showAll);
        changeDisplaySubjects(e);
    }

    const changeDisplaySubjects = (e) => {
        let searchValue = document.querySelector("input[type = 'search']").value.toLowerCase();

        let tempData = JSON.parse(localStorage.getItem('data')).data;

        tempData = filterData(tempData, showAll, searchValue)

        setData(tempData);
    }

    function filterData(data, bShowAll, searchString) {
        if (bShowAll) {
            for (let name in data) {
                if (!name.toLowerCase().includes(searchString)) {
                    delete data[name];
                }
            }
        } else {
            for (let name in data) {
                if ((data.hasOwnProperty(name) && JSON.stringify(data[name].Days) === '{}') || !name.toLowerCase().includes(searchString)) {
                    if (!data[name].Properties.ShortName.toLowerCase().includes(searchString)) {
                        delete data[name];
                    }
                }
            }
        }
        return data;
    }

    return (
        <>
            <main>
                <section className="sub-nav">
                    <div className='group'>
                        <h1>{"{"}</h1>
                        <div>
                            <p>Ustawienia zakresu</p>
                            <button onClick={changeSemester} data-value="1" className={buttonIndex == 1 ? 'active' : ''}>Semestr 1</button>
                            <button onClick={changeSemester} data-value="2" className={buttonIndex == 2 ? 'active' : ''}>Semestr 2</button>
                            <button onClick={changeSemester} data-value="0" className={buttonIndex == 0 ? 'active' : ''}>Wszystkie dane</button>
                        </div>
                        <h1>{"}"}</h1>
                    </div>
                    <div className='group'>
                        <h1>{"{"}</h1>
                        <div>
                            <p>Ustawienia wyświetlania</p>
                            <button onClick={changeDisplaySubjectsButton}>Pokaż wszystkie przedmioty</button>
                        </div>
                        <h1>{"}"}</h1>
                    </div>
                    <input onChange={changeDisplaySubjects} ref={inputRef} type='search' placeholder='Wyszukaj po nazwie...' />

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