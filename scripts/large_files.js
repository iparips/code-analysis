require('dotenv').config()
const fs = require('fs');
const {execSync} = require('child_process')

const codebaseDir = process.env.CODEBASE_DIR
const sizeThresholdKb = process.env.SIZE_THRESHOLD_KB || 15

const cmd = `find "${codebaseDir}/src" -type f -name "*.js" ! -path "*/.next/*" -size +"${sizeThresholdKb}"k | wc -l`
const files = execSync(cmd, {cwd: codebaseDir}).toString()
console.log(files);
