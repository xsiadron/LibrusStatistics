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
                    return (
                        <SubjectCard
                            key={index}
                            name={subjectKey}
                        />
                    );
                })}
            </section>
        </main>
    )
}