import SubjectCard from "./components/SubjectCard/SubjectCard"

export default function Home() {
    const data = JSON.parse(localStorage.getItem('data')).data;

    return (
        <main>
            <h1>Home</h1>
            <section>
                {Object.keys(data).map((subjectKey, index) => (
                    <SubjectCard
                        key={index}
                        name={subjectKey}
                        days={""}
                        attendancePercentage={25}
                    />
                ))}
            </section>
        </main>
    )
}