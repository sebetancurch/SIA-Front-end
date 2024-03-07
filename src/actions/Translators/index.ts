export const translateRole = (role: string): string => {
  switch (role) {
    case "ADMIN":
      return "Administrator";
    case "PROFESSOR":
      return "Professor";
    case "STUDENT":
      return "Student";
    default:
      return "";
  }
};
