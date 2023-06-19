import "./styles/Home.css"
import "./styles/config.css"
import SubjectCard from "./components/SubjectCard/SubjectCard"

export default function Home() {
    const data = JSON.parse(localStorage.getItem('data')).data;

    return (
        <main>
            <h1>Home</h1>
            <section className="subjects-cards">
                {Object.keys(data).map((subjectKey, index) => {
                    const { Attendances } = data[subjectKey];
                    const attendancePercentage = (Attendances.Summary[2]["Obecność"] / Attendances.Summary[2]["Quantity"]) * 100;

                    return (
                        <SubjectCard
                            key={index}
                            name={subjectKey}
                            attendancePercentage={attendancePercentage}
                        />
                    );
                })}
            </section>
        </main>
    )
}