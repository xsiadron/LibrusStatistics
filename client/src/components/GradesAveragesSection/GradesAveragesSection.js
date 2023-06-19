import "./GradesAveragesSection"

const GradesAveragesSection = ({ gradesData }) => {

    return (<div className="grades-averages">

        <table>
            <tbody>
                <tr>
                    <th>Semestralna</th>
                    <td>Średnia: </td>
                    <td>Wystawiona: </td>
                </tr>
                <tr>
                    <th>Roczna</th>
                    <td>Średnia: </td>
                    <td>Wystawiona: </td>
                </tr>
            </tbody>
        </table>
    </div>)
}

export default GradesAveragesSection;