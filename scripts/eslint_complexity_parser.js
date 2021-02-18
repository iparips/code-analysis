const selectComplexityViolations = violations => violations
  .filter(violation => violation.messages.length !== 0)
  .filter(violation => violation.messages.some((message) => message.ruleId === "complexity"))

const complexityViolationsReducer = (accumulator, currentViolation) => {
  accumulator[currentViolation.filePath] =
    currentViolation.messages
      .filter(m => m.ruleId === "complexity")
      .map(m => m.message)
  return accumulator;
}

const parseComplexityViolations = (eslintJson) => selectComplexityViolations(eslintJson)
  .reduce(complexityViolationsReducer, {})

module.exports = {
  parseComplexityViolations
}

// const eslintViolations = JSON.parse(fs.readFileSync('/Users/ilya/Code/move/rdc-x/eslint.json').toString())
// const complexityViolations = parseComplexityViolations(eslintViolations)
// console.log(complexityViolations)