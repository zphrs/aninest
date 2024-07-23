// https://stackoverflow.com/a/32108184
export function isEmpty(obj: object) {
  for (const _prop in obj) {
    return false
  }

  return true
}
