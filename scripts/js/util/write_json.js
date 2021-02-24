const fs = require('fs');

const writeJson = (outFile, jsonData) => {
  fs.writeFile(outFile, JSON.stringify(jsonData, null, 2), function (err) {
    if (err) return console.log(err);
    console.log(`Finished writing output to: ${outFile}`)
  });
}

module.exports = {
  writeJson
}
