const {execSync} = require('child_process')

const getFirstCommitDate = (codebaseDir) => {
  /*
  * git rev-list --max-parents=0 HEAD - list git revisions that have 0 parents => this returns the very first commit.
  * --format=%ci => committer date, ISO 8601-like format
  * | tail -n1 => return last line
  * */
  const firstCommitDateStr = execSync('git rev-list --max-parents=0 --format=%ci HEAD | tail -n1',
    {cwd: codebaseDir}).toString()
  return new Date(firstCommitDateStr)
}

module.exports = {
  getFirstCommitDate
}
