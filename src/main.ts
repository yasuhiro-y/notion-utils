import { notion } from './api/notion';

(async () => {
  const listUsersResponse = await notion.users.list({});
  console.log(listUsersResponse);
})();
