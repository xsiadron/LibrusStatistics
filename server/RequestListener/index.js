const fs = require('fs');
const https = require('https');
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
	res.setHeader('Access-Control-Allow-Headers', '*');
	res.setHeader('Access-Control-Allow-Credentials', true);

	next();
});

app.post('/', async function (req, res) {
	const { login, password } = req.body;
	try {
		let data = await downloadData(login, password);
		res.send(data);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

async function downloadData(login, password) {
	try {
		let librusApi = new LibrusApi();

		await librusApi.authorize(login, password);
		const attendances = await librusApi.getAttendances();
		const lessons = await librusApi.getLessons();
		const subjects = await librusApi.getSubjects();
		const grades = await librusApi.getGrades();
		const gradesCategories = await librusApi.getGradesCategories();
		const gradesComments = await librusApi.getGradesComments();
		const lessonsTimetableEntries = await librusApi.getLessonsTimetableEntries();
		const classes = await librusApi.getClasses();

		return {
			attendancesData: attendances,
			lessonsData: lessons,
			subjectsData: subjects,
			gradesData: grades,
			gradesCategoriesData: gradesCategories,
			gradesCommentsData: gradesComments,
			lessonsTimetableEntriesData: lessonsTimetableEntries,
			classesData: classes
		};
	} catch (error) {
		throw error;
	}
}

const privateKey = fs.readFileSync(config.privateKey, 'utf8');
const certificate = fs.readFileSync(config.certificate, 'utf8');

const options = {
	key: privateKey,
	cert: certificate,
}

https.createServer(options, app).listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
})