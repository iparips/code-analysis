require('dotenv').config()
const eachMonthOfInterval = require('date-fns/eachMonthOfInterval')
const format = require('date-fns/format')
const fs = require('fs');
const {execSync} = require('child_process')

const codebaseDir = process.env.CODEBASE_DIR
const testFilePattern = process.env.TEST_FILE_PATTERN || '.test.js'
const largeFileSizeThreshold = process.env.SIZE_THRESHOLD_KB || 15

const OUTPUT_PATH = 'public/data/'

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

const processDate = (date) => {
  execSync(`git checkout $(git rev-list --before="${date}" -n1 master) --quiet`, {cwd: codebaseDir}).toString()

  const appCloc = execSync(`cloc --not-match-f='${testFilePattern}' "${codebaseDir}/src" --quiet --json | jq '.JavaScript.code'`,
    {cwd: codebaseDir}).toString()
  const testCloc = execSync(`cloc --match-f='${testFilePattern}' "${codebaseDir}/src" --quiet --json | jq '.JavaScript.code'`,
    {cwd: codebaseDir}).toString()
  const numOfLargeFiles = execSync(`find "${codebaseDir}/src" -type f -name "*.js" ! -path "*/.next/*" -size +"${largeFileSizeThreshold}"k | wc -l`, {cwd: codebaseDir}).toString()

  const record = {
    date: format(date, "yyyy-MM-dd"),
    appLoc: Number(appCloc),
    testLoc: Number(testCloc),
    numOfLargeFiles: Number(numOfLargeFiles)
  }

  console.log("Record: ", record);
  return record
}

const locRawData = dates.map(processDate)
const ratios = locRawData.map((item) => {
  const ratio = item.testLoc / item.appLoc
  return [item.date, ratio]
})

const largeFiles = locRawData.map((item) => {
  return [item.date, item.numOfLargeFiles]
})

console.log("Raw data: ", locRawData);
console.log("Ratios: ", ratios);
console.log("Large files numbers: ", largeFiles);

const rawFilename = `${OUTPUT_PATH}/historical_raw_data.json`
fs.writeFile(rawFilename, JSON.stringify(locRawData, null, 2), function (err) {
  if (err) return console.log(err);
  console.log(`Finished writing output to: ${rawFilename}`)
});

const ratiosFilename = `${OUTPUT_PATH}/historical_ratios.json`
fs.writeFile(ratiosFilename, JSON.stringify(ratios, null, 2), function (err) {
  if (err) return console.log(err);
  console.log(`Finished writing output to: ${ratiosFilename}`)
});

const largeFilesFilename = `${OUTPUT_PATH}/historical_large_files.json`
fs.writeFile(largeFilesFilename, JSON.stringify(largeFiles, null, 2), function (err) {
  if (err) return console.log(err);
  console.log(`Finished writing output to: ${largeFilesFilename}`)
});
