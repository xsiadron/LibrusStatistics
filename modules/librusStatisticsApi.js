const fs = require('fs');
const config = require('../config/librus-config.js');

class DataConverter {
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

    getListOfSubjects(librus) {
        let subjects = {};

        const fileContent = fs.readFileSync(config.dataFilePath, "utf-8");
        const data = JSON.parse(fileContent);
        const attendances = data["Attendances"];

        let ids = [];
        for (let attendance of attendances) {
            ids.push(attendance["Lesson"]["Id"]);
        }
        ids = [...new Set(ids)];

        ids.forEach(id => {
            librus.getLessonData(id).then((lessonData) => {
                let subjectId = lessonData.Lesson.Subject.Id;
                librus.getSubjectData(subjectId).then((subjectData) => {
                    let subjectName = subjectData.Subject.Name;

                    subjects[subjectName = subjectData.Subject.Name]
                    console.log(subjectData.Subject.Name);
                });
            }).catch(console.error);
        });
    }
}

module.exports = DataConverter;