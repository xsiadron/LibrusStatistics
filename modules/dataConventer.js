const fs = require('fs');
const config = require('../config/librus-config.js');

class DataConverter {
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
            librus.getLessonStatisticsData(id).then((lessonStatisticsData) => {
                librus.getLessonData(id).then((lessonData) => {
                    let subjectId = lessonData.Lesson.Subject.Id;
                    librus.getSubjectData(subjectId).then((subjectData) => {
                        let subjectName = subjectData.Subject.Name;

                        subjects[subjectName = subjectData.Subject.Name]
                        console.log(subjectData.Subject.Name);
                        console.log(lessonStatisticsData.LessonsStatistics[0].Attendances);
                        console.log(lessonStatisticsData.LessonsStatistics[0].Absences);
                    });
                });
            }).catch(console.error);
        });
    }
}

module.exports = DataConverter;