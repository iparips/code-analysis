const dirTree = require('directory-tree');
const fs = require('fs');

const sourceDir = '***REMOVED***'
// const sourceDir = '***REMOVED***src'
const outputPath = 'public/data/file_hierarchy_no_next.json'

const tree = dirTree(sourceDir, {exclude: /\.next/}, (item, path, stats) => {
  item.value = Math.round(stats.size / 1024) // translating to kb
});

const treeArray = [tree]
fs.writeFile(outputPath, JSON.stringify(treeArray, null, 2), function (err) {
  if (err) return console.log(err);
  console.log(`Writing finished to ${outputPath}`);
});
