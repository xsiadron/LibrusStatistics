const axios = require("axios");
const { wrapper } = require('axios-cookiejar-support');
const { CookieJar } = require('tough-cookie');

const config = require('./config');

class LibrusApi {
	constructor() {
		this.cookie = new CookieJar();

		this.cookie.setCookie("TestCookie=1;", config.urls.home);

		this.caller = wrapper(
			axios.create({
				jar: this.cookie,
				withCredentials: true,
				headers: {
					"User-Agent":
						"User-Agent:Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.73 Safari/537.36",
				},
			})
		);
	}

	authorize(login, password) {
		return new Promise((resolve) => {
			let caller = this.caller;
			caller.get(config.urls.login).then(() => {
				return caller.postForm(config.urls.authorization,
					{
						action: "login",
						login: login,
						pass: password,
					}
				);
			}).then(() => {
				caller.get(config.urls.authorization2FA).then(() => {
					resolve(true);
				});
			}).catch(console.error);
		});
	}

	getAttendances() {
		return new Promise((resolve) => {
			let caller = this.caller;
			caller.get(config.urls.attendances)
				.then((response) => {
					let attendancesData = response.data;
					resolve(attendancesData);
				}).catch(console.error);
		});
	}

	getLessons() {
		return new Promise((resolve) => {
			let caller = this.caller;
			caller.get(config.urls.lessons).then((response) => {
				let lessonData = response.data
				resolve(lessonData);
			}).catch(console.error);
		});
	}

	getSubjects() {
		return new Promise((resolve) => {
			let caller = this.caller;
			caller.get(config.urls.subjects).then((response) => {
				let subjectData = response.data;
				resolve(subjectData);
			}).catch(console.error);
		});
	}

	getGrades() {
		return new Promise((resolve) => {
			let caller = this.caller;
			caller.get(config.urls.grades).then((response) => {
				let gradesData = response.data;
				resolve(gradesData);
			}).catch(console.error);
		});
	}

	getGradesCategories() {
		return new Promise((resolve) => {
			let caller = this.caller;
			caller.get(config.urls.gradesCategories).then((response) => {
				let gradesCategoriesData = response.data;
				resolve(gradesCategoriesData);
			}).catch(console.error);
		});
	}

	getGradesComments() {
		return new Promise((resolve) => {
			let caller = this.caller;
			caller.get(config.urls.gradesComments).then((response) => {
				let gradesCommentsData = response.data;
				resolve(gradesCommentsData);
			}).catch(console.error);
		});
	}

	getLessonsTimetableEntries() {
		return new Promise((resolve) => {
			let caller = this.caller;
			caller.get(config.urls.lessonsTimetableEntries).then((response) => {
				let lessonsTimetableEntries = response.data;
				resolve(lessonsTimetableEntries);
			}).catch(console.error);
		});
	}
}

module.exports = LibrusApi;