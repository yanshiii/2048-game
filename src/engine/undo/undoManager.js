export function createUndoManager(limit) {
  const stack = [];

  return {
    push(state) {
      if (limit && stack.length >= limit) stack.shift();
      stack.push(JSON.stringify(state));
    },

    undo() {
      return stack.length ? JSON.parse(stack.pop()) : null;
    },
  };
}
