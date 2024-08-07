interface NumberValue {
  value: number
}
function numero (): NumberValue {
  return {
    value: 12
  }
}
console.log(numero())
