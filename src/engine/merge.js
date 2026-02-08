export function mergeRowLeft(row) {
  let scoreGained = 0;
  const newRow = row.slice();

  for (let i = 0; i < newRow.length - 1; i++) {
    if (newRow[i] !== null && newRow[i] === newRow[i + 1]) {
      newRow[i] *= 2;
      newRow[i + 1] = null;
      scoreGained += newRow[i];
    }
  }

  return { row: newRow, scoreGained };
}
