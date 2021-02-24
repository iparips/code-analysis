require('dotenv').config()
const filterDeep = require('deepdash/filterDeep');

const dirTree = require('directory-tree');
const fs = require('fs');
const {writeJson} = require("../util/write_json");
const {parseComplexityViolations} = require("./eslint_complexity_parser");
const {execSync} = require('child_process')

const coveragePath = process.env.COVERAGE_SUMMARY_JSON_DIR
const eslintJsonFilePath = process.env.ESLINT_VIOLATIONS_JSON
const treemapRootDir = process.env.TREEMAP_ROOT_DIR

const OUTPUT_PATH = 'public/data'

console.log(`Coverage path: `, coveragePath);
console.log(`Eslint violations path: `, eslintJsonFilePath);
console.log(`Treemap root dir: `, treemapRootDir);

const coverageJson = JSON.parse(fs.readFileSync(coveragePath).toString())
const eslintViolations = JSON.parse(fs.readFileSync(eslintJsonFilePath).toString())
const complexityViolations = parseComplexityViolations(eslintViolations)

const treeBySize = dirTree(treemapRootDir, {exclude: /\.next/}, (file, path, stats) => {
  const numberOfLines = Number(execSync(`cat ${file.path} | sed '/^\\s*$/d' | wc -l`).toString())
  file.value = numberOfLines
  file.loc = numberOfLines
  file.branchCoverage = coverageJson[file.path]?.branches?.pct
  file.complexityMessages = complexityViolations[file.path]?.messages
  file.complexityAggregateValue = complexityViolations[file.path]?.aggregateValue
});

const treeByComplexity = dirTree(treemapRootDir, {exclude: /\.next|\.test.js/}, (file, path, stats) => {
  const numberOfLines = Number(execSync(`cat ${file.path} | sed '/^\\s*$/d' | wc -l`).toString())
  file.value = complexityViolations[file.path]?.aggregateValue
  file.branchCoverage = coverageJson[file.path]?.branches?.pct
  file.complexityMessages = complexityViolations[file.path]?.messages
  file.loc = numberOfLines
});

const treeWithComplexityValues = filterDeep(treeByComplexity, leaf => !!leaf.value, {
  leavesOnly: true,
  childrenPath: 'children'
})

writeJson(`${OUTPUT_PATH}/file_hierarchy_by_size.json`, [treeBySize])
writeJson(`${OUTPUT_PATH}/file_hierarchy_by_complexity.json`, [treeWithComplexityValues])
