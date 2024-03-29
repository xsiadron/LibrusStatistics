const config = {};

config.hostname = "";
config.port = 0;

config.urls = {
  home: "https://synergia.librus.pl",
  login: "https://api.librus.pl/OAuth/Authorization?client_id=46&response_type=code&scope=mydata",
  authorization: "https://api.librus.pl/OAuth/Authorization?client_id=46",
  authorization2FA: "https://api.librus.pl/OAuth/Authorization/2FA?client_id=46",
  attendances: "https://synergia.librus.pl/gateway/api/2.0/Attendances/",
  attendancesTypes: "https://synergia.librus.pl/gateway/api/2.0/Attendances/Types",
  subjects: "https://synergia.librus.pl/gateway/api/2.0/Subjects/",
  lessons: "https://synergia.librus.pl/gateway/api/2.0/Lessons/",
  grades: "https://synergia.librus.pl/gateway/api/2.0/Grades/",
  gradesCategories: "https://synergia.librus.pl/gateway/api/2.0/Grades/Categories",
  gradesComments: "https://synergia.librus.pl/gateway/api/2.0/Grades/Comments",
  lessonsTimetables: "https://synergia.librus.pl/gateway/api/2.0/Grades/Timetables",
  lessonsTimetableEntries: "https://synergia.librus.pl/gateway/api/2.0/TimetableEntries",
  lessonsHomeworks: "https://synergia.librus.pl/gateway/api/2.0/HomeWorks",
  classes: "https://synergia.librus.pl/gateway/api/2.0/Classes",
};

config.errors = {
    authorize: "<b>Nie udało się zalogować.</b><br/> Sprawdź poprawność wprowadzonych danych i spróbuj ponownie.",
    attendances: "<b>Nie udało się pobrać danych dotyczących obecności.</b><br/> Spróbuj ponownie lub skontaktuj się z administratorem strony.",
    lessons: "<b>Nie udało się pobrać danych dotyczących lekcji.</b><br/> Spróbuj ponownie lub skontaktuj się z administratorem strony.",
    subjects: "<b>Nie udało się pobrać danych dotyczących przedmiotów.</b><br/> Spróbuj ponownie lub skontaktuj się z administratorem strony.",
    grades: "<b>Nie udało się pobrać danych dotyczących ocen.</b><br/> Spróbuj ponownie lub skontaktuj się z administratorem strony.",
    gradesCategories: "<b>Nie udało się pobrać danych dotyczących kategorii ocen.</b><br/> Spróbuj ponownie lub skontaktuj się z administratorem strony.",
    gradesComments: "<b>Nie udało się pobrać danych dotyczących komentarzy ocen.</b><br/> Spróbuj ponownie lub skontaktuj się z administratorem strony.",
    lessonsTimetableEntries: "<b>Nie udało się pobrać danych dotyczących planu lekcji.</b><br/> Spróbuj ponownie lub skontaktuj się z administratorem strony.",
    classes: "<b>Nie udało się pobrać danych dotyczących semestru i roku szkolnego<b><br/>",
};

module.exports = config;