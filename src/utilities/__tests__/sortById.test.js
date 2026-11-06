import sortById from '../sortById';

describe('sortById', () => {
  it('sorts ascending by default', () => {
    expect(sortById([3, 1, 2])).toEqual([1, 2, 3]);
  });

  it('sorts descending when requested', () => {
    expect(sortById([3, 1, 2], 'descending')).toEqual([3, 2, 1]);
  });
});
