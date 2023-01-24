import dayjs from 'dayjs';
import { notion } from './api/notion';

// (async () => {
//   const listUsersResponse = await notion.users.list({});
//   console.log(listUsersResponse);
// })();

interface DateTitle {
  date?: string;
  title?: string;
}
const formatDateAndTitle = (str: string): DateTitle => {
  let rawDateString, dateString;

  // YYYYMMDD
  if (str.match(/^[0-9]{8}/)) {
    rawDateString = String(str.match(/^[0-9]{8}/));
    dateString = dayjs(rawDateString).format('YYYYMMDD');
    return {
      date: dayjs(rawDateString).format('YYYY-MM-DD'),

      title: generateTitle(str, rawDateString, dateString),
    };
  }
  // YYMMDD
  if (str.match(/^[0-9]{6}/)) {
    rawDateString = String(str.match(/^[0-9]{6}/));
    dateString = dayjs(rawDateString).format('YYYYMMDD');
    return {
      date: dayjs(rawDateString).format('YYYY-MM-DD'),
      title: generateTitle(str, rawDateString, dateString),
    };
  }
  // YYYY-MM-DD
  if (str.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}/)) {
    rawDateString = String(str.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}/));
    dateString = dayjs(rawDateString).format('YYYYMMDD');
    return {
      date: dayjs(rawDateString).format('YYYY-MM-DD'),
      title: generateTitle(str, rawDateString, dateString),
    };
  }
  // YY-MM-DD
  if (str.match(/^[0-9]{2}-[0-9]{2}-[0-9]{2}/)) {
    rawDateString = '20' + String(str.match(/^[0-9]{2}-[0-9]{2}-[0-9]{2}/));
    dateString = dayjs(rawDateString).format('YYYYMMDD');
    return {
      date: dayjs(rawDateString).format('YYYY-MM-DD'),
      title: generateTitle(str, rawDateString, dateString),
    };
  }
  return { date: undefined, title: undefined };
};

const generateTitle = (title: string, rawDateString: string, dateString: string) =>
  dateString + '_' + title.replace(rawDateString, '').replace(/^\s+/, '');

console.log(formatDateAndTitle('20220203 ミーティング'));
console.log(formatDateAndTitle('220203 ミーティング'));
console.log(formatDateAndTitle('20203 ミーティング'));
console.log(formatDateAndTitle('2022-02-03 ミーティング'));
console.log(formatDateAndTitle('22-02-03 ミーティング'));
