require('dotenv').config()
const fs = require('fs');
const {convertRawDataToSeries} = require("./convert_raw_data_to_series");
const {writeJson} = require('../util/write_json')

const HISTORICAL_RAW_DATA_PATH = 'public/data/historical_raw_data.json'
const OUTPUT_PATH = 'public/data'

const rawData = JSON.parse(fs.readFileSync(HISTORICAL_RAW_DATA_PATH).toString())

const [ratios, largeFiles, eslintIgnores] = convertRawDataToSeries(rawData)

writeJson(`${OUTPUT_PATH}/historical_ratios.json`, ratios)
writeJson(`${OUTPUT_PATH}/historical_large_files.json`, largeFiles)
writeJson(`${OUTPUT_PATH}/historical_eslint_ignores.json`, eslintIgnores)

