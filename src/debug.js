const Librus = require("../modules/librusApi.js");
const DataConverter = require("../modules/dataConventer.js");

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

readline.question(`Enter Email: `, login => {
    readline.question(`Enter Password: `, password => {
        const librus = new Librus();
        const dataConverter = new DataConverter();

        librus.authorize(login, password)
            .then(() => {
                return librus.getAttendances();
            }).then((attendances) => {
                setTimeout(() => {
                    return dataConverter.getListOfSubjects(librus);
                  }, 3000);
            }).catch(console.error);

        readline.close();
    });
});
