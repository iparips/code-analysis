const selectComplexityViolations = violations => violations
  .filter(violation => violation.messages.length !== 0)
  .filter(violation => violation.messages.some((message) => message.ruleId === "complexity"))

const parseAggregateValue = (messages) => {
  const regex = /.*complexity of (\d+)/
  return messages
    .map(message => Number(message.match(regex)?.[1])) // 1st group contains the matching number
    .reduce((a, c) => a + c)
}

const complexityViolationsReducer = (accumulator, currentViolation) => {
  const messages = currentViolation.messages
    .filter(m => m.ruleId === "complexity")
    .map(m => m.message)

  const aggregateValue = parseAggregateValue(messages)

  accumulator[currentViolation.filePath] = {
    messages,
    aggregateValue
  }

  return accumulator;
}

const parseComplexityViolations = (eslintJson) => selectComplexityViolations(eslintJson)
  .reduce(complexityViolationsReducer, {})

module.exports = {
  parseComplexityViolations
}
