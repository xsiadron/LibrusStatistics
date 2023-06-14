import LibrusApi from "./LibrusApi.js";

export const handler = async (event) => {
  const { httpMethod, login, password, headers } = event;
  
  let data = await downloadData(login, password);
  
  return(data);
}

async function downloadData(login, password) {
  let librusApi = new LibrusApi();
  try {
    const authorized = await librusApi.authorize(login, password);
    if (authorized) {
      const attendances = await librusApi.getAttendances();
      const lessons = await librusApi.getLessons();
      const subjects = await librusApi.getSubjects();
      const grades = await librusApi.getGrades();
      const gradesCategories = await librusApi.getGradesCategories();
      const gradesComments = await librusApi.getGradesComments();

      return {
        attendancesData: attendances,
        lessonsData: lessons,
        subjectsData: subjects,
        gradesData: grades,
        gradesCategoriesData: gradesCategories,
        gradesCommentsData: gradesComments
      };
    } else throw new Error("Not authorized");
  } catch (error) {
    return false;
  }
}
