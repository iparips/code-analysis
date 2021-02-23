# TODO
- [ ] Cleanup duplication in prep historical data scripts.
- [ ] Make the current state graph toggle box sizes based on file size and complexity
- [x] Historical: add a tracker for a number of ignored eslint warnings 

# Pre-requisites

- Please install the following dependencies
    `brew install jq cloc`
- Make sure you have the version of node specified in .nvmrc
- Install dependencies `npm i`

# Usage

Set the following env variables with absolute paths:
- SOURCE_DIR
- COVERAGE_SUMMARY_JSON_DIR

Then execute `npm run prep && npm start`

# Issues

- When generating historical data, sometimes the first commit sha is empty
