const dirTree = require('directory-tree');
const fs = require('fs');

const sourceDir = '***REMOVED***'
// const sourceDir = '***REMOVED***src'
const outputPath = 'public/data/file_hierarchy_no_next.json'

const tree = [dirTree(sourceDir, {exclude: /\.next/})];
fs.writeFile(outputPath, JSON.stringify(tree, null, 2), function (err) {
  if (err) return console.log(err);
  console.log(`Writing finished to ${outputPath}`);
});
