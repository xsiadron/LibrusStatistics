const LibrusApi = require("./LibrusApi");
const express = require('express');
const bodyParser = require('body-parser');

const hostname = 'localhost';
const port = 4000;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});

app.post('/', async function (req, res) {
    let initialTime = Date.now();
    console.log("Request incoming...")
    const { login, password } = req.body;
    let data = await downloadData(login, password);

    let secondsTaken = Math.round((Date.now() - initialTime)/1000).toFixed(2) ;
    console.log("Request done in "+ secondsTaken + " seconds");
    res.send(data);
});

async function downloadData(login, password) {
    let librusApi = new LibrusApi();
    try {
        const authorized = await librusApi.authorize(login, password);
        if (authorized) {
            const attendances = await librusApi.getAttendances();
            const lessons = await librusApi.getLessons();
            const subjects = await librusApi.getSubjects();
            const grades = await librusApi.getGrades();
            const gradesCategories = await librusApi.getGradesCategories();

            return { attendancesData: attendances, lessonsData: lessons, subjectsData: subjects, gradesData: grades, gradesCategoriesData: gradesCategories };
        } else throw console.error;
    } catch (error) {
        return false;
    }
}

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});