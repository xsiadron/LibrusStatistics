import "./Grade.css"

export default function Grade({grade, weight}) {
    return (<div className="grade">
        <h1 className="grade-title">{grade}</h1>
        <h2 className="grade-weight">{weight}</h2>
    </div>)
}