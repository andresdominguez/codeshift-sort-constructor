/**
 * Compares two objects with name properties.
 * @param {{name: string}} a
 * @param {{name: string}} b
 * @return {number}
 */
module.exports = (a, b) => {
  if (a.name < b.name) return -1;
  if (a.name > b.name) return 1;
  // names must be equal
  return 0;
};
