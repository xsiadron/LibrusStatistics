const LibrusApi = require("./LibrusApi");
const express = require('express');
const bodyParser = require('body-parser');
const config = require("./config");

const hostname = config.hostname;
const port = config.port;

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
	const { login, password } = req.body;
	let data = await downloadData(login, password);

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
			const gradesComments = await librusApi.getGradesComments();
			const lessonsTimetableEntries = await librusApi.getLessonsTimetableEntries();

			return {
				attendancesData: attendances,
				lessonsData: lessons,
				subjectsData: subjects,
				gradesData: grades,
				gradesCategoriesData: gradesCategories,
				gradesCommentsData: gradesComments,
				lessonsTimetableEntriesData: lessonsTimetableEntries
			};
		} else throw new Error("Not authorized");
	} catch (error) {
		return false;
	}
}

app.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});