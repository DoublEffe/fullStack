const info = (...params) => {
  console.log(...params)
}

const error = (...parmas) => {
  console.log(...parmas)
}

module.exports = {
  info,
  error
}