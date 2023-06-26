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
	const eventBody = JSON.parse(event.body) || {};

	const login = eventBody["login"];
	const password = eventBody["password"];

	try {
		let data = await downloadData(login, password);
		const response = {
			statusCode: 200,
			body: JSON.stringify(data),
			headers: {
				"Access-Control-Allow-Origin": "http://localhost",
				"Access-Control-Allow-Headers": "Content-Type",
				"Access-Control-Allow-Methods": "POST",
				"Access-Control-Expose-Headers": "Content-Type",
				"Access-Control-Max-Age": "86400",
				"Access-Control-Allow-Credentials": "true"
			}
		};
		callback(null, response);
	} catch (error) {
		const response = {
			statusCode: 500,
			body: JSON.stringify({error: error.message}),
			headers: {
				"Access-Control-Allow-Origin": "http://localhost",
				"Access-Control-Allow-Headers": "Content-Type",
				"Access-Control-Allow-Methods": "POST",
				"Access-Control-Expose-Headers": "Content-Type",
				"Access-Control-Max-Age": "86400",
				"Access-Control-Allow-Credentials": "true"
			}
		};
		callback(null, response);
	}
}
