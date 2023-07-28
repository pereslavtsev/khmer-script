import { tr } from './km-translit';

const testCases: TestCase[] = require('../../../test-cases.json');

interface TestCase {
  raw: string;
  expected: string;
  actual: string;
  differsAt: number;
  passed: boolean;
}

describe('Module:km-translit/testcases', () => {
  it(``, () => {
    expect(tr('ដីឥដ្ឋ')).toEqual('ʼĕdeidth');
  });

  // describe('compare with actual (legacy) ', () => {
  //   for (const testCase of testCases) {
  //     const { raw, actual, differsAt } = testCase;
  //
  //     it(`"${raw}" should be "${actual}" (differs at: ${differsAt})`, () => {
  //       expect(tr(raw)).toEqual(actual);
  //     });
  //   }
  // });
  //
  // describe('compare with expected ', () => {
  //   for (const testCase of testCases) {
  //     const { raw, expected, differsAt } = testCase;
  //
  //     it(`"${raw}" should be "${expected}"`, () => {
  //       expect(tr(raw)).toEqual(expected);
  //     });
  //   }
  // });
});
