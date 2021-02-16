const dirTree = require("directory-tree");
const fs = require('fs');

const tree = dirTree("***REMOVED***src");
fs.writeFile('data/file_hierarchy.json', JSON.stringify(tree, null, 2), function (err) {
  if (err) return console.log(err);
  console.log('Writing finished.');
});
