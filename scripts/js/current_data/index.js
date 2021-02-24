require('dotenv').config()

const dirTree = require('directory-tree');
const fs = require('fs');
const {writeJson} = require("../util/write_json");
const {parseComplexityViolations} = require("./eslint_complexity_parser");
const {execSync} = require('child_process')

const coveragePath = process.env.COVERAGE_SUMMARY_JSON_DIR
const eslintJsonFilePath = process.env.ESLINT_VIOLATIONS_JSON
const treemapRootDir = process.env.TREEMAP_ROOT_DIR

const OUTPUT_PATH = 'public/data/file_hierarchy_no_next.json'

console.log(`Coverage path: `, coveragePath);
console.log(`Eslint violations path: `, eslintJsonFilePath);
console.log(`Treemap root dir: `, treemapRootDir);

const coverageJson = JSON.parse(fs.readFileSync(coveragePath).toString())
const eslintViolations = JSON.parse(fs.readFileSync(eslintJsonFilePath).toString())
const complexityViolations = parseComplexityViolations(eslintViolations)

const tree = dirTree(treemapRootDir, {exclude: /\.next/}, (file, path, stats) => {
  const numberOfLines = execSync(`cat ${file.path} | sed '/^\\s*$/d' | wc -l`).toString()
  file.value = numberOfLines
  file.branchCoverage = coverageJson[file.path]?.branches?.pct
  file.complexity = complexityViolations[file.path]
});

writeJson(OUTPUT_PATH, [tree])
