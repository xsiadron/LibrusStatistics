import LibrusApi from "./LibrusApi.js";

export const handler = async (event) => {
	const { httpMethod, login, password, headers } = event;

	try {
		let data = await downloadData(login, password);
		return (data);
	} catch (error) {
		return { error: error.message };
	}
}

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
