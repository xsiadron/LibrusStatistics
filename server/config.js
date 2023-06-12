const config = {};

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
};

module.exports = config;