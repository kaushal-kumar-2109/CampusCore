const comman = `PRAGMA journal_mode = WAL;`;

/* ********************  get user data start here ******************** */
const getUserDataQuery = `
    SELECT * FROM userToken;
`;
/* ******************** get user data ends here ******************** */

export {getUserDataQuery};