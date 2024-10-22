const navigationCollectionItems = (collection, currentItem) => {
  let currentIndex, prevIndex, nextIndex;
  currentIndex = collection.findIndex((collectionItem) => {
    return collectionItem.slug === currentItem;
  });
  if (currentIndex !== 0) {
    prevIndex = collection[currentIndex - 1];
  } else {
    prevIndex = collection[collection.length - 1];
  }

  if (currentIndex === collection.length - 1) {
    nextIndex = collection[0];
  } else {
    nextIndex = collection[currentIndex + 1];
  }

  return { currentIndex, prevIndex, nextItem: nextIndex };
};

export default navigationCollectionItems;
