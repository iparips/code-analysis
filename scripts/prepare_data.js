const dirTree = require('directory-tree');
const fs = require('fs');
const {execSync} = require('child_process')

const sourceDir = '***REMOVED***'
// const sourceDir = '***REMOVED***src'
const outputPath = 'public/data/file_hierarchy_no_next.json'

const tree = dirTree(sourceDir, {exclude: /\.next/}, (file, path, stats) => {
  const numberOfLines = execSync(`cat ${file.path} | sed '/^\\s*$/d' | wc -l`).toString()
  file.value = numberOfLines
});

const treeArray = [tree]
fs.writeFile(outputPath, JSON.stringify(treeArray, null, 2), function (err) {
  if (err) return console.log(err);
  console.log(`Writing finished to ${outputPath}`);
});
