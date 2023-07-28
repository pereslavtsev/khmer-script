import { tr } from './km-translit';

describe('Module:km-translit/testcases (actual)', () => {
  it('ដីឥដ្ឋ', () => {
    expect(tr('ដីឥដ្ឋ')).toEqual('ʼĕdeidth');
  });
});
