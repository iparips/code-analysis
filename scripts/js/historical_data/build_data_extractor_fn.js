const format = require('date-fns/format')
const {execSync} = require('child_process')
const fs = require('fs');

const buildDataExtractorFn = (
  codebaseDir,
  testFilePattern,
  largeFileSizeThreshold) => (date) => {

  const commitSha = execSync(`git rev-list --before="${date}" -n1 master`, {cwd: codebaseDir}).toString().trim()

  if(commitSha === '') {
    console.warn('Warning: Commit had an empty sha. Skipping.');
    return undefined
  }

  execSync(`git checkout ${commitSha} --quiet`, {cwd: codebaseDir}).toString()

  if(!fs.existsSync(`${codebaseDir}/src`)) {
    console.warn(`Warning: Commit ${commitSha} does not have ${codebaseDir}/src dir. Skipping.`);
    return undefined
  }

  const appCloc = execSync(`cloc --not-match-f='${testFilePattern}' --exclude-dir=".next" "${codebaseDir}/src" --quiet --json | jq '.JavaScript.code'`).toString()

  const testCloc = execSync(`cloc --match-f='${testFilePattern}' --exclude-dir=".next" "${codebaseDir}/src" --quiet --json | jq '.JavaScript.code'`).toString()

  const numOfLargeFiles = execSync(`find ${codebaseDir}/src -type f -name "*.js" ! -path "*/.next/*" -size +"${largeFileSizeThreshold}"k | wc -l`).toString()

  const numOfEslintIgnores = execSync(`find ${codebaseDir}/src -type f -name "*.js" ! -path "*.next/*" | xargs grep eslint-disable | wc -l`).toString()

  const record = {
    commitSha,
    date: format(date, "yyyy-MM-dd"),
    appLoc: Number(appCloc),
    testLoc: Number(testCloc),
    numOfLargeFiles: Number(numOfLargeFiles),
    numOfEslintIgnores: Number(numOfEslintIgnores)
  }

  console.log("Record: ", record);
  return record
}

module.exports = {
  buildDataExtractorFn
}
