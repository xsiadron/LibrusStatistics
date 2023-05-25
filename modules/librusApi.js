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
}

module.exports = Librus;