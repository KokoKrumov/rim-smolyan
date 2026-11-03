import navigationCollectionItems from './navigationCollectionItems';

describe('navigationCollectionItems', () => {
  const collection = [{ slug: 'a' }, { slug: 'b' }, { slug: 'c' }];

  it('returns neighbours for an item in the middle', () => {
    expect(navigationCollectionItems(collection, 'b')).toEqual({
      currentIndex: 1,
      prevIndex: collection[0],
      nextItem: collection[2],
    });
  });

  it('wraps to the last item when on the first one', () => {
    expect(navigationCollectionItems(collection, 'a')).toEqual({
      currentIndex: 0,
      prevIndex: collection[2],
      nextItem: collection[1],
    });
  });

  it('wraps to the first item when on the last one', () => {
    expect(navigationCollectionItems(collection, 'c')).toEqual({
      currentIndex: 2,
      prevIndex: collection[1],
      nextItem: collection[0],
    });
  });

  it('points to itself when the collection has a single item', () => {
    const single = [{ slug: 'only' }];
    expect(navigationCollectionItems(single, 'only')).toEqual({
      currentIndex: 0,
      prevIndex: single[0],
      nextItem: single[0],
    });
  });
});
