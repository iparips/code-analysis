# TODO
- [ ] Make the current state graph toggle box sizes based on file size and complexity

# Pre-requisites

- Please install the following dependencies
    `brew install jq cloc`
- Make sure you use the version of node specified in .nvmrc
- Install dependencies `npm i`
- Collect complexity metrics from the target codebase by executing
    `npx eslint --rule 'complexity: ['error', { max: 10 }]' --format json --output-file eslint.json --no-inline-config src`
- In target codebase jest config (eg: jest.config.js), add json-summary reporter, and run coverage target
    `coverageReporters: [ ..., 'json-summary']`

# Usage

Set the following env variables with absolute paths:
- TREEMAP_ROOT_DIR 
- COVERAGE_SUMMARY_JSON_DIR
- ESLINT_VIOLATIONS_JSON
- CODEBASE_DIR
  
Then execute `npm run prep && npm start`

# Issues

- When generating historical data, sometimes the first commit sha is empty
