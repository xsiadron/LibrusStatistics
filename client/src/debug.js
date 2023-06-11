const { sum } = require("lodash");
const LibrusApi = require("./modules/librusApi");
const LibrusStatisticsApi = require("../../server/LibrusStatisticsApi");
const fs = require("fs")

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

            let librusStatisticsData = await librusStatisticsApi.getLibrusStatisticsData(librusApi);
            await librusStatisticsApi.saveData(librusStatisticsData);
        } else throw console.error;
    } catch (error) {
        console.error(error);
    }
}