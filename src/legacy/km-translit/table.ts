export function insert<T = unknown>(array: T[], newValue: T) {
  array.push(newValue)
}

export function concat<T = unknown>(array: T[], separator: string) {
  return array.join(separator);
}
