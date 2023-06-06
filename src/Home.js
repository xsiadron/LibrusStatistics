import SubjectCard from "./components/SubjectCard/SubjectCard"

export default function Home() {
    return (
        <section>
            <h1>Home</h1>
            <SubjectCard name={"Nazwa"} days={"pon. wt. śr. czw. pt. sob. niedz."} attendancePercentage={25} />
        </section>
    )
}