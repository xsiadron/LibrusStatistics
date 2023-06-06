import axios from "axios";
import { wrapper } from 'axios-cookiejar-support';
import { CookieJar } from 'tough-cookie';

const { default: config } = require('../config/librus-config');

class LibrusApi {
    constructor(cookies) {
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

    getLessonData(lessonId) {
        return new Promise((resolve) => {
            let caller = this.caller;
            caller.get(config.urls.lessons + lessonId).then((response) => {
                let lessonData = response.data
                resolve(lessonData);
            }).catch(console.error);
        });
    }

    getSubjectData(subjectId) {
        return new Promise((resolve) => {
            let caller = this.caller;
            caller.get(config.urls.subjects + subjectId).then((response) => {
                let subjectData = response.data;
                resolve(subjectData);
            }).catch(console.error);
        });
    }
}

export default LibrusApi;