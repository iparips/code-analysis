/*
* Splits raw data into 3 arrays
* @returns [ratios, largeFiles, eslintIgnores]
* */
const convertRawDataToSeries = (rawData) => {
  return rawData.reduce((acc, current) => {
    const ratio = current.testLoc / current.appLoc
    acc[0].push([current.date, ratio])
    acc[1].push([current.date, current.numOfLargeFiles])
    acc[2].push([current.date, current.numOfEslintIgnores])
    return acc
  }, [[], [], []])
}

module.exports = {
  convertRawDataToSeries
}
