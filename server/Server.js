const LibrusApi = require("./librusApi");
const express = require('express');
const bodyParser = require('body-parser');

const hostname = 'localhost';
const port = 4000;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});

app.post('/pobieranie', async function (req, res) {
    const { login, password } = req.body;
    let attendances = await fetchAttendances(login, password);
    res.send(attendances);
});

async function fetchAttendances(login, password) {
    try {
        let attendances = await downloadData(login, password);
        return attendances;
    } catch (error) {
        return false
    }
}

async function downloadData(login, password) {
    let librusApi = new LibrusApi();
    try {
        const authorized = await librusApi.authorize(login, password);
        if (authorized) {
            const attendances = await librusApi.getAttendances();
            return attendances;
        } else throw console.error;
    } catch (error) {
        return false;
    }
}

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});