require('dotenv').config()
const fs = require('fs');

const HISTORICAL_RAW_DATA_PATH = 'public/data/historical_raw_data.json'
const OUTPUT_PATH = 'public/data'

const rawData = JSON.parse(fs.readFileSync(HISTORICAL_RAW_DATA_PATH).toString())

const ratios = rawData.map((item) => {
  const ratio = item.testLoc / item.appLoc
  return [item.date, ratio]
})

const largeFiles = rawData.map((item) => {
  return [item.date, item.numOfLargeFiles]
})

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
