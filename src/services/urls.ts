export const azureUrls = {
  users: {
    login: "/api/v1/users/login",
    getUserDataByToken: "/api/v1/users/getUserDataByToken",
    create: "/api/v1/users/register",
    update: "/api/v1/users",
    list: "/api/v1/users/listPaginatedUsers",
    deanList: "/api/v1/users/listPaginatedUsersAllowedForDean",
    activate: "/api/v1/users/activate",
  },
  faculties: {
    update: "/api/v1/faculty",
    list: "/api/v1/faculty/listPaginatedFaculties",
  },
  programs: {
    update: "/api/v1/program",
    list: "/api/v1/program/listPaginatedPrograms",
  },
  courses: {
    update: "/api/v1/course",
    list: "/api/v1/course/listPaginatedCourses",
  },
  subjects: {
    update: "/api/v1/subject",
    list: "/api/v1/subject/listPaginatedSubjects",
  },
};
