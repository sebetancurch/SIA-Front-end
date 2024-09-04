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

export const translateState = (role: string): string => {
  switch (role) {
    case "ACTIVE":
      return "Active";
    case "INACTIVE":
      return "Inactive";
    case "PENDING":
      return "Pending";
    default:
      return "";
  }
};
