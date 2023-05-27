const cheerio = require('cheerio');
const axios = require('axios');
const fs = require('fs');
const { wrapper } = require('axios-cookiejar-support');
const { CookieJar } = require('tough-cookie');

const config = require('../config/librus-config.js');

class Librus {
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
        let caller = this.caller;
        return caller.get(config.urls.login).then(() => {
            return caller.postForm(config.urls.authorization,
                {
                    action: "login",
                    login: login,
                    pass: password,
                }
            );
        }).then(() => {
            return caller.get(config.urls.authorization2FA).then(() => {
                return this.cookie.getCookies(config.urls.home);
            });
        }).catch(console.error);
    }

    getAttendances() {
        let caller = this.caller;
        return caller.get(config.urls.attendances).then((response) => {
            const data = JSON.stringify(response.data);
            fs.writeFile(config.dataFilePath, data, (err) => {
                if (err) {
                    console.error('Błąd podczas zapisywania pliku:', err);
                } else {
                    console.log('Strona została zapisana do pliku znajdującego się w folderze ' + config.tempPath);
                }
            });
        }).catch(console.error);
    }

    getLessonStatisticsData(lessonStatisticsId) {
        let caller = this.caller;
        return caller.get(config.urls.lessonStatistics + lessonStatisticsId)
            .then((response) => {
                let lessonStatisticsData = response.data;
                return lessonStatisticsData;
            }).catch(console.error);
    }

    getLessonData(lessonId) {
        let caller = this.caller;
        return caller.get(config.urls.lessons + lessonId).then((response) => {
            let lessonData = response.data
            return lessonData;
        }).catch(console.error);
    }

    getSubjectData(subjectId) {
        let caller = this.caller;

        return caller.get(config.urls.subjects + subjectId).then((response) => {
            let subjectData = response.data;
            return subjectData;
        }).catch(console.error);
    }
}

module.exports = Librus;