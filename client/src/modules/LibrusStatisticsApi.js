const config = require('../config/librus-config.js');

class LibrusStatisticsApi {
    async getAttendanceData(data, attendance) {
        const lessonId = attendance.Lesson.Id;
        const lessonName = await this.getLessonName(lessonId, data);

        const date = attendance.Date;
        const semester = attendance.Semester;
        const type = config.attendaceTypes[attendance.Type.Id];

        return {
            Name: lessonName,
            Date: date,
            Semester: semester,
            Type: type,
        };
    }

    async getLessonName(lessonId, data) {
        const lessons = data.lessonsData.Lessons;
        const subjects = data.subjectsData.Subjects;

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

    prepareAttendancesData(data, name, semester, type) {
        data.Attendances ??= {};
        data.Attendances[name] ??= {};
        data.Attendances[name].Details ??= {};
        data.Attendances[name].Details[semester] ??= {};

        data.Attendances[name].Summary ??= {};
        data.Attendances[name].Summary[semester] ??= {};
        data.Attendances[name].Summary[semester].Quantity ??= 0;
        data.Attendances[name].Summary[semester][type] ??= 0;

        return data;
    }

    async getAttendancesData(data) {
        const attendances = data.attendancesData.Attendances;
        let attendancesData = {};

        let i = 0;
        for (let attendance of attendances) {
            const attendanceData = await this.getAttendanceData(data, attendance);

            // Przygotowanie sekcji JSON jeśli nie istnieje
            attendancesData = this.prepareAttendancesData(attendancesData, attendanceData.Name, attendanceData.Semester, attendanceData.Type);

            // Zwiększanie ilości frekwencji w podsumowaniu
            const attendancesCount = attendancesData.Attendances[attendanceData.Name].Summary[attendanceData.Semester].Quantity;
            attendancesData.Attendances[attendanceData.Name].Summary[attendanceData.Semester].Quantity = attendancesCount + 1;

            const attendanceCount = attendancesData.Attendances[attendanceData.Name].Summary[attendanceData.Semester][attendanceData.Type];
            attendancesData.Attendances[attendanceData.Name].Summary[attendanceData.Semester][attendanceData.Type] = attendanceCount + 1;

            attendancesData.Attendances[attendanceData.Name].Details[attendanceData.Semester][i] = {
                date: attendanceData.Date,
                semester: attendanceData.Semester,
                type: attendanceData.Type,
            };
            i++;
        }

        return attendancesData;
    }

    async getGradeData(data, gradeData) {
        const lessonId = gradeData.Lesson.Id;
        const lessonName = await this.getLessonName(lessonId, data);

        const grade = gradeData.Grade;
        const date = gradeData.Date;
        const semester = gradeData.Semester;

        const isConstituent = gradeData.IsConstituent;
        const isFinal = gradeData.IsFinal;
        const isFinalProposition = gradeData.IsFinalProposition;
        const isSemester = gradeData.IsSemester;
        const isSemesterProposition = gradeData.IsSemesterProposition;

        return {
            Name: lessonName,
            Grade: grade,
            Date: date,
            Semester: semester,
            IsConstituent: isConstituent,
            IsFinal: isFinal,
            IsFinalProposition: isFinalProposition,
            IsSemester: isSemester,
            IsSemesterProposition: isSemesterProposition,
        };
    }

    prepareGradesData(data, name, semester) {
        data.Grades ??= {};
        data.Grades[name] ??= {};
        data.Grades[name][semester] ??= {};

        return data;
    }

    async getGradesData(data) {
        const grades = data.gradesData.Grades;
        let gradesData = {};

        let i = 0;
        for (let grade of grades) {
            const gradeData = await this.getGradeData(data, grade);

            // Przygotowanie sekcji JSON jeśli nie istnieje
            gradesData = this.prepareGradesData(gradesData, gradeData.Name, gradeData.Semester);

            gradesData.Grades[gradeData.Name][gradeData.Semester][i] = {
                Name: gradeData.Name,
                Grade: gradeData.Grade,
                Date: gradeData.Date,
                Semester: gradeData.Semester,
                IsConstituent: gradeData.IsConstituent,
                IsFinal: gradeData.IsFinal,
                IsFinalProposition: gradeData.IsFinalProposition,
                IsSemester: gradeData.IsSemester,
                IsSemesterProposition: gradeData.IsSemesterProposition,
            };
            i++;
        }

        return gradesData;
    }

    async convertData(data) {
        try {
            let attendancesData = await this.getAttendancesData(data);
            let gradesData = await this.getGradesData(data);
            let librusStatisticsData = {...attendancesData, ...gradesData};
            return librusStatisticsData;
        } catch (error) {
            return false;
        }
    }
}

module.exports = LibrusStatisticsApi;
