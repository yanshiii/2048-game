export function slideRowLeft(row) {
  const filtered = row.filter(v => v !== null);
  while (filtered.length < row.length) filtered.push(null);
  return filtered;
}

export function reverseRow(row) {
  return [...row].reverse();
}

export function transpose(grid) {
  return grid[0].map((_, i) => grid.map(row => row[i]));
}
