const config = require("./config.js");
const LibrusApi = require("./LibrusApi.js");
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

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

		return {
			attendancesData: attendances,
			lessonsData: lessons,
			subjectsData: subjects,
			gradesData: grades,
			gradesCategoriesData: gradesCategories,
			gradesCommentsData: gradesComments,
			lessonsTimetableEntriesData: lessonsTimetableEntries
		};
	} catch (error) {
		throw error;
	}
}

app.use(bodyParser.json());
app.use(cors());

app.post('/', async (req, res) => {
    const login = req.body.login;
    const password = req.body.password;

	try {
		let data = await downloadData(login, password);
		res.json(data);
	} catch (error) {
		res.json(error.message);
	}
});

app.listen(config.port, () => {
    console.log(`Serwer uruchomiony na porcie ${config.port}.`);
});
