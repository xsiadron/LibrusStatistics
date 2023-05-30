const fs = require('fs');
const config = require('../config/librus-config.js');
const { Console } = require('console');

class DataConverter {
    static librus;

    constructor(librus) {
        this.constructor.librus = librus;
    }

    saveData(data) {
        return new Promise((resolve, reject) => {
            data = JSON.stringify(data);
            fs.writeFile(config.dataFilePath, data, (err) => {
                if (err) {
                    console.error('Błąd podczas zapisywania pliku:', err);
                    reject(err);
                } else {
                    console.log('Strona została zapisana do pliku znajdującego się w folderze ' + config.tempPath);
                    resolve(true);
                }
            });
        })
    }

    async getAttendancesSimplifiedData(attendances) {
        let lessonTypes = {};
        let i = 0;
        for (let attendance of attendances) {
            let lessonId = attendance["Lesson"]["Id"];
            if (lessonTypes[lessonId] == null) {
                let lessonData = await this.constructor.librus.getLessonData(lessonId);
                let subjectData = await this.constructor.librus.getSubjectData(lessonData.Lesson.Subject.Id);
                lessonTypes[lessonId] = subjectData.Subject.Name;
                i++;
                console.log(i)
            }

            let name = lessonTypes[lessonId];
            let date = attendance["Date"];
            let semester = attendance["Semester"];
            let type = config.attendaceTypes[attendance["Type"]["Id"]];

            // console.log(name);
            // console.log(date);
            // console.log(semester);
            // console.log(type);
        }
    }

    getListOfSubjects() {
        let subjects = {};

        const fileContent = fs.readFileSync(config.dataFilePath, "utf-8");
        const data = JSON.parse(fileContent);
        const attendances = data["Attendances"];

        this.getAttendancesSimplifiedData(attendances);


        // ids = [...new Set(ids)];

        // ids.forEach(id => {
        //     librus.getLessonData(id).then((lessonData) => {
        //         let subjectId = lessonData.Lesson.Subject.Id;
        //         librus.getSubjectData(subjectId).then((subjectData) => {
        //             let subjectName = subjectData.Subject.Name;

        //             subjects[subjectName = subjectData.Subject.Name]
        //             console.log(subjectData.Subject.Name);
        //         });
        //     }).catch(console.error);
        // });
    }
}

module.exports = DataConverter;