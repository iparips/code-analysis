require('dotenv').config()
const eachMonthOfInterval = require('date-fns/eachMonthOfInterval')
const format = require('date-fns/format')
const fs = require('fs');
const {execSync} = require('child_process')

const codebaseDir = process.env.CODEBASE_DIR
const testFilePattern = process.env.TEST_FILE_PATTERN || '.test.js'

const OUTPUT_PATH = 'public/data/historical_data.json'

if (!codebaseDir) {
  console.log("Please set CODEBASE_DIR to proceed");
  exit(1)
}

console.log(`CODEBASE_DIR: ${codebaseDir}`);
console.log(`TEST_FILE_PATTERN: ${testFilePattern}`);

/*
* git rev-list --max-parents=0 HEAD - list git revisions that have 0 parents => this returns the very first commit.
* --format=%ci => committer date, ISO 8601-like format
* | tail -n1 => return last line
* */
const firstCommitDateStr = execSync('git rev-list --max-parents=0 --format=%ci HEAD | tail -n1',
  {cwd: codebaseDir}).toString()
const firstCommitDate = new Date(firstCommitDateStr)
const now = new Date()

const dates = eachMonthOfInterval({
  start: firstCommitDate,
  end: now
})

console.log(`From first commit date: ${firstCommitDate}`);
console.log(`To present time: ${now}`);

const processDate = (acc, currentDate) => {
  execSync(`git checkout $(git rev-list --before="${currentDate}" -n1 master) --quiet`, {cwd: codebaseDir}).toString()

  const appCloc = execSync(`cloc --not-match-f='${testFilePattern}' "${codebaseDir}/src" --quiet --json | jq '.JavaScript.code'`,
    {cwd: codebaseDir}).toString()
  const testCloc = execSync(`cloc --match-f='${testFilePattern}' "${codebaseDir}/src" --quiet --json | jq '.JavaScript.code'`,
    {cwd: codebaseDir}).toString()

  acc[format(currentDate, "yyyy-MM-dd")] = {
    appLoc: Number(appCloc),
    testLoc: Number(testCloc)
  }
  return acc;
}

const lineOfCodeCounts = dates.reduce(processDate, {})

console.log("Line of Code Counts: ", lineOfCodeCounts);

fs.writeFile(OUTPUT_PATH, JSON.stringify(lineOfCodeCounts, null, 2), function (err) {
  if (err) return console.log(err);
  console.log(`Finished writing output to: ${OUTPUT_PATH}`);
});
