// Reordering / removing helpers shared by every list editor.
export function moveItem<T>(list: T[], index: number, delta: number): T[] {
  const target = index + delta;
  if (target < 0 || target >= list.length) return list;
  const next = [...list];
  [next[index], next[target]] = [next[target], next[index]];
  return next;
}

export const replaceAt = <T>(list: T[], index: number, value: T) =>
  list.map((item, i) => (i === index ? value : item));

export const removeAt = <T>(list: T[], index: number) => list.filter((_, i) => i !== index);
