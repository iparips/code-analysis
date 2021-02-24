require('dotenv').config()
const eachMonthOfInterval = require('date-fns/eachMonthOfInterval')
const {convertRawDataToSeries} = require("./convert_raw_data_to_series");
const {getFirstCommitDate} = require("./get_first_commit_date");
const {writeJson} = require('../util/write_json')
const {buildDataExtractorFn} = require('./build_data_extractor_fn')

const testFilePattern = process.env.TEST_FILE_PATTERN || '.test.js'
const largeFileSizeThreshold = process.env.SIZE_THRESHOLD_KB || 15
const codebaseDir = process.env.CODEBASE_DIR
const OUTPUT_PATH = 'public/data'

if (!codebaseDir) {
  console.log("Please set CODEBASE_DIR to proceed");
  exit(1)
}

console.log(`CODEBASE_DIR: ${codebaseDir}`);
console.log(`TEST_FILE_PATTERN: ${testFilePattern}`);

const firstCommitDate = getFirstCommitDate(codebaseDir)
const now = new Date()

const dates = eachMonthOfInterval({
  start: firstCommitDate,
  end: now
})

console.log(`From first commit date: ${firstCommitDate}`);
console.log(`To present time: ${now}`);

const extractDataForDateFn = buildDataExtractorFn(
  codebaseDir,
  testFilePattern,
  largeFileSizeThreshold
)

const rawData = dates.map(extractDataForDateFn).filter(element => element !== undefined)

const [ratios, largeFiles, eslintIgnores] = convertRawDataToSeries(rawData)

writeJson(`${OUTPUT_PATH}/historical_raw_data.json`, rawData)
writeJson(`${OUTPUT_PATH}/historical_ratios.json`, ratios)
writeJson(`${OUTPUT_PATH}/historical_large_files.json`, largeFiles)
writeJson(`${OUTPUT_PATH}/historical_eslint_ignores.json`, eslintIgnores)
