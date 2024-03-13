import core, { getInput } from '@actions/core';
import { getOctokit } from '@actions/github';

(async () => {
  const token = core.getInput('github-token', { required: true })
  const sha = core.getInput('sha', { required: true })
  const reason = core.getInput('reason', { required: true })
  const checksInput = core.getInput('checks', { required: true });
  const ownerAndRepo = core.getInput('repo', { required: true })
  const owner = ownerAndRepo.split("/")[0]
  const repo = ownerAndRepo.split("/")[1]
  const status = 'success'
  const octokit = getOctokit(token)

  const checks = checksInput.includes('\n') ? checksInput.trim().split('\n') : [checksInput.trim()];
  for (const check of checks) {
    await octokit.repos.createCommitStatus({
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
