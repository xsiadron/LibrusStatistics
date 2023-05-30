const LibrusApi = require("../modules/librusApi.js");
const LibrusStatisticsApi = require("../modules/librusStatisticsApi.js");

const librusApi = new LibrusApi();
const librusStatisticsApi = new LibrusStatisticsApi(librusApi);

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

readline.question(`Enter Email: `, login => {
    readline.question(`Enter Password: `, password => {
        fetchData(login, password);
        readline.close();
    });
});

async function fetchData(login, password) {
    try {
        const authorized = await librusApi.authorize(login, password);
        if (authorized) {
            const attendances = await librusApi.getAttendances();
            await librusStatisticsApi.saveData(attendances);

            await librusStatisticsApi.getListOfSubjects(librusApi);
        } else throw console.error;
    } catch (error) {
        console.error(error);
    }
}