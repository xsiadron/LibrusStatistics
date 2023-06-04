const fs = require('fs');
const config = require('../config/librus-config.js');

class DataConverter {
    static librus;

    constructor(librus) {
        this.constructor.librus = librus;
    }

    async saveData(data) {
        try {
            data = JSON.stringify(data);
            await fs.promises.writeFile(config.dataFilePath, data);
            console.log('Strona została zapisana do pliku znajdującego się w folderze ' + config.tempPath);
            return true;
        } catch (err) {
            console.error('Błąd podczas zapisywania pliku:', err);
            throw err;
        }
    }

    prepareData(data, name, semester, type) {
        data[name] ??= {};
        data[name]["Details"] ??= {};
        data[name]["Details"][semester] ??= {};
        
        data[name]["Summary"] ??= {};
        data[name]["Summary"][semester] ??= {};
        data[name]["Summary"][semester]["Ilość"] ??= 0;
        data[name]["Summary"][semester][type] ??= 0;

        return data;
    }

    async getAttendanceData(attendance) {
        const lessonId = attendance["Lesson"]["Id"];
        const lessonName = await this.getLessonName(lessonId);

        const date = attendance["Date"];
        const semester = attendance["Semester"];
        const type = config.attendaceTypes[attendance["Type"]["Id"]];

        return {
            Name: lessonName,
            Date: date,
            Semester: semester,
            Type: type,
        };
    }

    async getLessonName(lessonId) {
        const lessonNames = await this.getLessonNames();

        if (lessonNames[lessonId] == null) {
            const lessonData = await this.constructor.librus.getLessonData(lessonId);
            const subjectData = await this.constructor.librus.getSubjectData(lessonData.Lesson.Subject.Id);
            lessonNames[lessonId] = subjectData.Subject.Name;
        }

        return lessonNames[lessonId];
    }

    async getLessonNames() {
        // Zwraca buforowane dane nazwy lekcji
        // Jeśli dane nie są jeszcze buforowane, zwraca pustą mapę
        if (!this.lessonNames) {
            this.lessonNames = {};
        }
        return this.lessonNames;
    }

    async getAttendancesData(attendances) {
        let attendancesData = {};
    
        let i = 0;
        for (let attendance of attendances) {
            const attendanceData = await this.getAttendanceData(attendance);

            // Create data if not exists
            attendancesData = this.prepareData(attendancesData, attendanceData.Name, attendanceData.Semester, attendanceData.Type);

            // Increment attendance count
            const attendancesCount = attendancesData[attendanceData.Name]["Summary"][attendanceData.Semester]["Ilość"];
            attendancesData[attendanceData.Name]["Summary"][attendanceData.Semester]["Ilość"] = attendancesCount + 1;
            
            const attendanceCount = attendancesData[attendanceData.Name]["Summary"][attendanceData.Semester][attendanceData.Type];
            attendancesData[attendanceData.Name]["Summary"][attendanceData.Semester][attendanceData.Type] = attendanceCount + 1;

            attendancesData[attendanceData.Name]["Details"][attendanceData.Semester][i] = {
                date: attendanceData.Date,
                semester: attendanceData.Semester,
                type: attendanceData.Type,
            };
            i++;
        }

        return attendancesData;
    }

    async getLibrusStatisticsData() {
        try {
            const fileContent = await fs.promises.readFile(config.dataFilePath, "utf-8");
            const data = JSON.parse(fileContent);
            const attendances = data["Attendances"];

            const attendancesData = await this.getAttendancesData(attendances);
            return attendancesData;
        } catch (err) {
            console.error('Wystąpił błąd:', err);
            throw err;
        }
    }
}

module.exports = DataConverter;
