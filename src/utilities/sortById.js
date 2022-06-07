const sortById = (collection, order = "ascending") => {
  return collection.sort((a, b) => (order === "descending" ? b - a : a - b));
};

export default sortById;
