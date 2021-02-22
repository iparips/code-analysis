require('dotenv').config()

const dirTree = require('directory-tree');
const fs = require('fs');
const {parseComplexityViolations} = require("./eslint_complexity_parser");
const {execSync} = require('child_process')

const coveragePath = process.env.COVERAGE_SUMMARY_JSON_DIR
const sourceDir = process.env.SOURCE_DIR
const eslintJsonFilePath = process.env.ESLINT_VIOLATIONS_JSON

const OUTPUT_PATH = 'public/data/file_hierarchy_no_next.json'

console.log(`Source Dir: `, sourceDir);
console.log(`Coverage Path: `, coveragePath);

const coverageJson = JSON.parse(fs.readFileSync(coveragePath).toString())
const eslintViolations = JSON.parse(fs.readFileSync(eslintJsonFilePath).toString())
const complexityViolations = parseComplexityViolations(eslintViolations)

const tree = dirTree(sourceDir, {exclude: /\.next/}, (file, path, stats) => {
  const numberOfLines = execSync(`cat ${file.path} | sed '/^\\s*$/d' | wc -l`).toString()
  file.value = numberOfLines
  file.branchCoverage = coverageJson[file.path]?.branches?.pct
  file.complexity = complexityViolations[file.path]
});

const treeArray = [tree]
fs.writeFile(OUTPUT_PATH, JSON.stringify(treeArray, null, 2), function (err) {
  if (err) return console.log(err);
  console.log(`Finished writing output to: ${OUTPUT_PATH}`);
});