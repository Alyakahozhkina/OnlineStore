export const sort = (data, name, direction) => {
  return [...data].sort((a, b) => {
    if (a[name] > b[name]) {
      return direction === 'asc' ? 1 : -1;
    } if (a[name] < b[name]) {
      return direction === 'asc' ? -1 : 1;
    }
    return 0;
  })
};
