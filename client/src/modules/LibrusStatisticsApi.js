const config = require('../config/librus-config.js');

class LibrusStatisticsApi {
    async getAttendanceData(data, attendace) {
        const lessons = data["lessonsData"]["Lessons"];
        const subjects = data["subjectsData"]["Subjects"];

        const lessonId = attendace["Lesson"]["Id"];
        const lessonName = await this.getLessonName(lessonId, lessons, subjects);

        const date = attendace["Date"];
        const semester = attendace["Semester"];
        const type = config.attendaceTypes[attendace["Type"]["Id"]];

        return {
            Name: lessonName,
            Date: date,
            Semester: semester,
            Type: type,
        };
    }

    async getLessonName(lessonId, lessons, subjects) {
        const lessonNames = await this.getLessonNames();

        if (lessonNames[lessonId] == null) {
            const lessonData = lessons.find(item => item.Id === lessonId);
            const subjectData = subjects.find(item => item.Id === lessonData.Subject.Id);
            lessonNames[lessonId] = subjectData.Name;
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

    async getAttendancesData(data) {
        const attendances = data["attendancesData"]["Attendances"];
        let attendancesData = {};

        let i = 0;
        for (let attendance of attendances) {
            const attendanceData = await this.getAttendanceData(data, attendance);

            // Przygotowanie sekcji JSON jeśli nie istnieje
            attendancesData = this.prepareData(attendancesData, attendanceData.Name, attendanceData.Semester, attendanceData.Type);

            // Zwiększanie ilości frekwencji
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

    async convertData(data) {
        console.log("Getting data");
        try {
            data = JSON.stringify(data);
            data = JSON.parse(data);
            console.log(data);

            let librusStatisticsData = await this.getAttendancesData(data);
            return librusStatisticsData;
        } catch (error) {
            return false;
        }
    }
}

module.exports = LibrusStatisticsApi;
