//info for printing log messages
const info = (...params) => {
  console.log(...params)
}

//error for printing all error messages
const error = (...params) => {
  console.error(...params)
}

module.exports = { info, error }