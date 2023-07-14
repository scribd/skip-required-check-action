const core = require('@actions/core');
const github = require('@actions/github');

(async () => {
  const token = core.getInput('github-token', { required: true })
  const sha = core.getInput('sha', { required: true })
  const reason = core.getInput('reason', { required: true })
  const checks = core.getInput('checks', { required: true }).split("\n")
  const ownerAndRepo = core.getInput('repo', { required: true })
  const owner = ownerAndRepo.split("/")[0]
  const repo = ownerAndRepo.split("/")[1]
  const status = core.getInput('status', { required: true })
  const octokit = new github.GitHub(token)

  for (const check of checks) {
    await octokit.repos.createStatus({
      owner: owner,
      repo: repo,
      sha: sha,
      state: status,
      description: reason,
      context: check
    })
    console.log(`Successfully skipped "${check}".`)
  }

})().catch(error => {
  console.error(error)
  core.setFailed(error.message)
})