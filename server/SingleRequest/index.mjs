import LibrusApi from "./LibrusApi.js";

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
		throw new Error(error);
	}
}

export const handler = async (event, context, callback) => {
	let userData = {};
	let login = "";
	let password = "";
	if (event && event.body) {
		userData = JSON.parse(event.body);
		if (userData.login && userData.password) {
			login = String(userData.login);
			password = String(userData.password);
		}
	}

	try {
		let data = await downloadData(login, password);
		const response = {
			statusCode: 200,
			body: JSON.stringify(data),
			isBase64Encoded: false
		};
		return response;
	} catch (error) {
		const response = {
			statusCode: 401,
			body: JSON.stringify({error: error.message}),
			isBase64Encoded: false
		};
		return response;
	}
}
