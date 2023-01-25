import dayjs from 'dayjs';
import * as fs from 'fs'; // 読み込む

const filePathFrom = './src/data/from.txt';
const filePathDist = './src/data/dist.txt';

interface DateTitle {
  date?: string;
  title?: string;
}
export const formatDateAndTitle = (str: string): DateTitle => {
  let rawDateString, dateString;
  // YYYYMMDD
  if (str.match(/^[0-9]{8}/)) {
    rawDateString = String(str.match(/^[0-9]{8}/));
    dateString = dayjs(rawDateString).format('YYYYMMDD');
    return {
      date: dayjs(rawDateString).format('YYYY/MM/DD'),
      title: generateTitle(str, rawDateString, dateString),
    };
  }

  // YYYY/MM/DD
  if (str.match(/^[0-9]{2,4}[\/|-|.][0-9]{1,2}[\/|-|.][0-9]{1,2}/)) {
    rawDateString = String(str.match(/^[0-9]{2,4}[\/|-|.][0-9]{1,2}[\/|-|.][0-9]{1,2}/));
    dateString = dayjs(rawDateString).format('YYYYMMDD');
    return {
      date: dayjs(rawDateString).format('YYYY/MM/DD'),
      title: generateTitle(str, rawDateString, dateString),
    };
  }

  // MM-DD
  if (str.match(/^[0-9]{1,2}[\/|-|.][0-9]{1,2}/)) {
    rawDateString = '20' + String(str.match(/^[0-9]{1,2}-[0-9]{1,2}/));
    dateString = dayjs(rawDateString).format('YYYYMMDD');
    return {
      date: dayjs(rawDateString).format('YYYY/MM/DD'),
      title: generateTitle(str, rawDateString, dateString),
    };
  }
  // YYMMDD
  if (str.match(/^[0-9]{6}/)) {
    rawDateString = String(str.match(/^[0-9]{6}/));
    dateString = dayjs('20' + rawDateString).format('YYYYMMDD');
    return {
      date: dayjs('20' + rawDateString).format('YYYY/MM/DD'),
      title: generateTitle(str, rawDateString, dateString),
    };
  }
  // MMDD
  if (str.match(/^[0-9]{4}/)) {
    rawDateString = String(str.match(/^[0-9]{4}/));
    dateString = dayjs('2022' + rawDateString).format('YYYYMMDD');
    return {
      date: dayjs('2022' + rawDateString).format('YYYY/MM/DD'),
      title: generateTitle(str, rawDateString, dateString),
    };
  }

  return { date: undefined, title: str };
};

const generateTitle = (title: string, rawDateString: string, dateString: string) =>
  dateString + '_' + title.replace(rawDateString, '').replace('_', '').replace(/^\s+/, '').split('\n')[0];

const convertToTab = (title?: string, date?: string) => {
  if (title && date) {
    return date + String.fromCharCode(9) + title;
  }
  return String.fromCharCode(9) + title;
};

const convertText = async () => {
  await fs.readFile(filePathFrom, 'utf8', async (err, data) => {
    const lines = await data.toString().split('\n');

    fs.truncate(filePathDist, 0, () => {});
    let newLines = '';
    for (const idx in lines) {
      const line = await lines[idx];

      const { title, date } = await formatDateAndTitle(line);

      const newLine = await convertToTab(title, date);

      newLines = (await newLines) + newLine + '\n';
    }

    await fs.appendFile(filePathDist, newLines + '\n', (err) => {
      if (err) throw err;
    });
  });
};

convertText();
