import axios from 'axios';
import * as cheerio from 'cheerio';
import * as fs from 'fs';

(async () => {
  const { data } = await axios.get('https://en.wiktionary.org/wiki/Module:km-translit/testcases');
  const $ = cheerio.load(data);
  const testCases = $('.unit-tests tr:not(:eq(0))')
    .map(function () {
      const raw = $(this).find('td:eq(1)').text().trim();
      const expected = $(this).find('td:eq(2)').text().trim();
      const actual = $(this).find('td:eq(3)').text().trim();
      const differsAt = +$(this).find('td:eq(4)').text();
      const passed = !differsAt;
      return { raw, expected, actual, differsAt, passed };
    })
    .toArray();

  await fs.promises.writeFile('test-cases.json', JSON.stringify(testCases, null, 2));
})();
