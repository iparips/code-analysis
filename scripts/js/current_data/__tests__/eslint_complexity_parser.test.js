const {parseComplexityViolations} = require("../eslint_complexity_parser");

describe('parseComplexityViolations', () => {

  describe('complexity messages', () => {
    const rawData = [
      {
        "filePath": "filename",
        "messages": [
          {
            "ruleId": "complexity",
            "message": "Arrow function has a complexity of 28. Maximum allowed is 10.",
          }
        ]
      }
    ]

    it('parses complexity violation messages', () => {
      const result = parseComplexityViolations(rawData)
      expect(result).toEqual({
        ["filename"]: {
          messages: [
            "Arrow function has a complexity of 28. Maximum allowed is 10."
          ]
        }
      })
    });
  });

  describe('aggregate complexity value', () => {
    const rawData = [
      {
        "filePath": "filename",
        "messages": [
          {
            "ruleId": "complexity",
            "message": "Arrow function has a complexity of 28. Maximum allowed is 10.",
          },
          {
            "ruleId": "complexity",
            "message": "Arrow function has a complexity of 99. Maximum allowed is 10.",
          }
        ]
      }
    ]

    it('parses aggregate complexity value', () => {
      const result = parseComplexityViolations(rawData)
      expect(result["filename"].aggregateValue).toEqual(28 + 99)
    });
  });
});
