const dirTree = require('directory-tree');
const fs = require('fs');
const {execSync} = require('child_process')

const coveragePath = '***REMOVED***coverage/coverage-summary.json'
const coverageJson = JSON.parse(fs.readFileSync(coveragePath).toString())

const sourceDir = '***REMOVED***'
const outputPath = 'public/data/file_hierarchy_no_next.json'

const tree = dirTree(sourceDir, {exclude: /\.next/}, (file, path, stats) => {
  const numberOfLines = execSync(`cat ${file.path} | sed '/^\\s*$/d' | wc -l`).toString()
  file.value = numberOfLines
  file.branchCoverage = coverageJson[file.path]?.branches?.pct
});

const treeArray = [tree]
fs.writeFile(outputPath, JSON.stringify(treeArray, null, 2), function (err) {
  if (err) return console.log(err);
  console.log(`Writing finished to ${outputPath}`);
});
