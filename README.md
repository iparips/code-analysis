# Overview

This is a tool for analysing codebases, and visualising historical, and a point in time view of metrics relating to code quality.

# Pre-requisites

- Please install the following dependencies
    `brew install jq cloc`
- Make sure you use the version of node specified in .nvmrc
- Install dependencies `npm i`
- Collect complexity metrics from the target codebase by executing
    `npx eslint --rule 'complexity: ['error', { max: 1 }]' --format json --output-file eslint.json --no-inline-config src`
- In target codebase jest config (eg: jest.config.js), add json-summary reporter, and run coverage target
    `coverageReporters: [ ..., 'json-summary']`

# Usage

Set the following env variables with absolute paths:
- TREEMAP_ROOT_DIR - source directory at root of the filesize / complexity tree map
- COVERAGE_SUMMARY_JSON_DIR
- ESLINT_VIOLATIONS_JSON
- CODEBASE_DIR - project dir of the codebase under assessment
  
Then execute `npm run prep && npm start`
