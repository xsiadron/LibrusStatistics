const config = require('../config/librus-config.js');

class LibrusStatisticsApi {
    data = {};
    lessonsNames = {};

    constructor(data) {
        this.data = data;
        this.setLessonsNames();
    }

    async convertData() {
        try {
            let attendancesData = await this.getAttendancesData();
            let gradesData = await this.getGradesData();
            let daysData = await this.getLessonsDaysData();
            let shortNameData = this.lessonsNames["Short"];

            let librusStatisticsData = {};

            for (let subjectId in this.lessonsNames["Full"]) {
                let lessonName = this.getLessonNameBySubjectId(subjectId);

                let attendance = attendancesData?.[lessonName]?.Attendances ?? false;
                let grade = gradesData?.[lessonName]?.Grades ?? false;
                let days = daysData?.[lessonName] ?? false;

                if (attendance && grade && days) {
                    librusStatisticsData[lessonName] ??= {};
                    librusStatisticsData[lessonName].Attendances = attendance;
                    librusStatisticsData[lessonName].Grades = grade;
                    librusStatisticsData[lessonName].Days = days;
                    librusStatisticsData[lessonName].Properties = { ShortName: shortNameData[lessonName] };
                }
            }
            return librusStatisticsData;
        } catch (error) {
            return error;
        }
    }

    async setLessonsNames() {
        const subjects = this.data.subjectsData.Subjects;

        for (let subject of subjects) {
            const subjectId = subject.Id;
            const subjectName = subject.Name;
            const subjectShortName = subject.Short;

            this.lessonsNames["Full"] ??= [];
            this.lessonsNames["Short"] ??= [];

            this.lessonsNames["Full"][subjectId] = subjectName;
            this.lessonsNames["Short"][subjectName] = subjectShortName;
        }
    }

    getLessonNameByLessonId(lessonId, shortName = false) {
        const lessons = this.data.lessonsData.Lessons;

        const lessonData = lessons.find(item => item.Id === lessonId);
        const subjectId = lessonData.Subject.Id;

        if (shortName) return this.lessonsNames["Short"][subjectId];

        return this.lessonsNames["Full"][subjectId];
    }

    getLessonNameBySubjectId(subjectId, shortName = false) {
        if (shortName) return this.lessonsNames["Short"][subjectId];
        return this.lessonsNames["Full"][subjectId];
    }

    async getAttendanceData(attendance) {
        const lessonId = attendance.Lesson.Id;
        const lessonName = await this.getLessonNameByLessonId(lessonId);

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

    async getAttendancesData() {
        const attendances = this.data.attendancesData.Attendances;
        let attendancesData = {};

        let i = 0;
        for (let attendance of attendances) {
            const attendanceData = await this.getAttendanceData(attendance);
            // Przygotowanie sekcji JSON jeśli nie istnieje
            attendancesData = this.prepareAttendancesData(attendancesData, attendanceData.Name, attendanceData.Semester, attendanceData.Type);

            // Zwiększanie ilości frekwencji w podsumowaniu
            const attendancesCount = attendancesData[attendanceData.Name].Attendances.Summary[attendanceData.Semester].Quantity;
            attendancesData[attendanceData.Name].Attendances.Summary[attendanceData.Semester].Quantity = attendancesCount + 1;

            const attendanceCount = attendancesData[attendanceData.Name].Attendances.Summary[attendanceData.Semester][attendanceData.Type];
            attendancesData[attendanceData.Name].Attendances.Summary[attendanceData.Semester][attendanceData.Type] = attendanceCount + 1;

            attendancesData[attendanceData.Name].Attendances.Details[attendanceData.Semester][i] = {
                date: attendanceData.Date,
                semester: attendanceData.Semester,
                type: attendanceData.Type,
            };
            i++;
        }
        return attendancesData;
    }

    prepareAttendancesData(attendancesData, name, semester, type) {
        attendancesData[name] ??= {};
        attendancesData[name].Attendances ??= {};
        attendancesData[name].Attendances.Details ??= {};
        attendancesData[name].Attendances.Details[semester] ??= {};

        attendancesData[name].Attendances.Summary ??= {};
        attendancesData[name].Attendances.Summary[semester] ??= {};
        attendancesData[name].Attendances.Summary[semester].Quantity ??= 0;
        attendancesData[name].Attendances.Summary[semester][type] ??= 0;

        return attendancesData;
    }

    async getGradeData(gradeData) {
        const lessonId = gradeData.Lesson.Id;
        const categoryId = gradeData.Category.Id;
        const gradeId = gradeData.Id;

        const lessonName = await this.getLessonNameByLessonId(lessonId);
        const grade = gradeData.Grade;
        const date = gradeData.Date;
        const semester = gradeData.Semester;
        const isConstituent = gradeData.IsConstituent;
        const isFinal = gradeData.IsFinal;
        const isFinalProposition = gradeData.IsFinalProposition;
        const isSemester = gradeData.IsSemester;
        const isSemesterProposition = gradeData.IsSemesterProposition;

        const categoryData = this.data.gradesCategoriesData.Categories.find(item => item.Id === categoryId);

        const categoryName = categoryData.Name;
        const gradeCountToTheAverage = categoryData.CountToTheAverage;
        const gradeWeight = categoryData.Weight;

        const gradeCommentData = this.data.gradesCommentsData.Comments.find(item => item.Grade.Id === gradeId);

        let gradeComment = "Brak";
        if (gradeCommentData) gradeComment = gradeCommentData.Text;


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
            CategoryName: categoryName,
            GradeCountToTheAverage: gradeCountToTheAverage,
            GradeWeight: gradeWeight,
            GradeComment: gradeComment
        };
    }

    prepareGradesData(gradesData, name, semester) {
        gradesData[name] ??= {};
        gradesData[name].Grades ??= {};
        gradesData[name].Grades[semester] ??= [];

        return gradesData;
    }

    async getGradesData() {
        const grades = this.data.gradesData.Grades;
        let gradesData = {};

        let i = 0;
        for (let grade of grades) {
            const gradeData = await this.getGradeData(grade);

            // Przygotowanie sekcji JSON jeśli nie istnieje
            gradesData = this.prepareGradesData(gradesData, gradeData.Name, gradeData.Semester);

            if (gradeData != null) {
                let index = Object.keys(gradesData[gradeData.Name].Grades[gradeData.Semester]).length - 1;
                gradesData[gradeData.Name].Grades[gradeData.Semester][index + 1] = {
                    ...gradeData
                };
            }
            i++;
        }
        return gradesData;
    }

    async getLessonDays() {
        if (!this.lessonDays) {
            this.lessonDays = {};
        }
        return this.lessonDays;
    }

    async getLessonsDaysData() {
        const entries = this.data.lessonsTimetableEntriesData.TimetableEntries;
        let lessonsDays = {};

        let i = 0;
        for (let entry of entries) {
            let lessonName = this.getLessonNameByLessonId(entry.Lesson.Id);
            let dayOfTheWeek = entry.DayOfTheWeek;

            if (lessonsDays[lessonName]) {
                lessonsDays[lessonName].push(dayOfTheWeek);
            } else {
                lessonsDays[lessonName] = [dayOfTheWeek];
            }

            i++;
        }
        return lessonsDays;
    }
}

export default LibrusStatisticsApi;
