export function onlyNumbers (array) {
  return array.every(element => {
    return typeof element === 'number'
  })
}

