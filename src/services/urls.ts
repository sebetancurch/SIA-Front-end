export const azureUrls = {
  users: {
    login: `${process.env.DOMAIN_DEV}/api/v1/users/login`,
    create: `${process.env.DOMAIN_DEV}/api/v1/users/register`,
    update: `${process.env.DOMAIN_DEV}/api/v1/users`,
    list: `${process.env.DOMAIN_DEV}/api/v1/users/listPaginatedUsers`,
    activate: `${process.env.DOMAIN_DEV}/api/v1/users/activate`,
  },
};
