import { check } from './check'

export function sort (key, data) {
  const src = check(data)
  return src.sort((a, b) => {
    return compare(a, b, key)
  })
}

function compare (a, b, key) {
  const valueA = computeCorrelation(a, key)
  const valueB = computeCorrelation(b, key)
  if (valueA > valueB) {
    return -1
  }
  if (valueA < valueB) {
    return 1
  }
  if (valueB === valueA) {
    if (a.promotionPrice !== null && b.promotionPrice === null) {
      return -1
    }
    if (a.promotionPrice === null && b.promotionPrice !== null) {
      return 1
    } else {
      return 0
    }
  }
}

function computeCorrelation (obj, key) {
  let correlation = 0
  if (obj.name.includes(key)) {
    correlation = correlation + 1 - (obj.name.length - key.length) * 0.1
  }
  if (obj.className.includes(key)) {
    correlation = correlation + 1 - (obj.className.length - key.length) * 0.15
  }
  return correlation
}
