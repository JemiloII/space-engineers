const filter = require('lodash.filter');

const filterBySearch = (collection, searchInput) => {
  let search = {};

  if (typeof searchInput === 'number') {
    search = {EntityId: searchInput};
  }

  if (typeof searchInput === 'object') {
    search = searchInput;
  }

  if (typeof searchInput === 'string') {
    search = {DisplayName: searchInput};
  }

  const result = filter(collection, search);

  return searchInput && result.length === 1 ? result[0] : result;
};

module.exports = {
  filterBySearch
};
