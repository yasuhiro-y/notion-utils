import { notion } from './api/api';

(async () => {
  const listUsersResponse = await notion.users.list({});
  console.log(listUsersResponse);
})();
