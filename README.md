# Skip Required Check Action

GitHub Action for skipping required status checks on pull requests.

## Inputs

### `checks`

**Required** The status check(s) to skip.

### `reason`

A short description of why the check was skipped. *Default value:* 'Skipping Required Check'

## Example usage

```yaml
- name: Skip Test Status Checks
  uses: justAnotherDev/skip-required-check-action@v1
  with:
    checks: |
      Run Unit Tests
      Run Snapshot Tests
    reason: Incrementing Build Number
```
