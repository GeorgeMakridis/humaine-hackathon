#!/usr/bin/env bash
# Create a new GitHub repository (via API) and push this repo's main branch.
# Requires a Personal Access Token with "repo" scope (classic) or equivalent (fine-grained).
#
# Usage:
#   export GITHUB_TOKEN="ghp_..."   # or fine-grained token
#   export GITHUB_OWNER="your-username-or-org"   # must match token permissions
#   export REPO_NAME="HumAIne-hackathon"         # optional
#   ./scripts/create-github-repo-and-push.sh
#
# Optional:
#   export PRIVATE_REPO=true   # create a private repository

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

: "${GITHUB_TOKEN:?Set GITHUB_TOKEN (GitHub PAT)}"
: "${GITHUB_OWNER:?Set GITHUB_OWNER to your GitHub username or org name}"

REPO_NAME="${REPO_NAME:-HumAIne-hackathon}"
PRIVATE_JSON='false'
if [[ "${PRIVATE_REPO:-}" == "true" ]]; then
  PRIVATE_JSON='true'
fi

if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "Not a git repository." >&2
  exit 1
fi

LOGIN="$(
  curl -sS -H "Accept: application/vnd.github+json" -H "Authorization: Bearer ${GITHUB_TOKEN}" https://api.github.com/user \
    | python3 -c "import sys, json; d=json.load(sys.stdin); print(d.get('login') or '')"
)"

if [[ -z "$LOGIN" ]]; then
  echo "Could not resolve authenticated GitHub user. Check GITHUB_TOKEN." >&2
  exit 1
fi

CREATE_URL=""
if [[ "${GITHUB_OWNER}" == "${LOGIN}" ]]; then
  CREATE_URL="https://api.github.com/user/repos"
else
  CREATE_URL="https://api.github.com/orgs/${GITHUB_OWNER}/repos"
fi

echo "Creating ${REPO_NAME} under ${GITHUB_OWNER} (authenticated as ${LOGIN}) ..."

HTTP_CODE="$(
  curl -sS -o /tmp/gh-create-repo.json -w '%{http_code}' \
    -X POST \
    -H "Accept: application/vnd.github+json" \
    -H "Authorization: Bearer ${GITHUB_TOKEN}" \
    "${CREATE_URL}" \
    -d "{\"name\":\"${REPO_NAME}\",\"private\":${PRIVATE_JSON},\"auto_init\":false}"
)"

if [[ "$HTTP_CODE" != "201" ]]; then
  echo "GitHub API error (HTTP ${HTTP_CODE}). Response:" >&2
  cat /tmp/gh-create-repo.json >&2 || true
  exit 1
fi

REMOTE_URL="https://github.com/${GITHUB_OWNER}/${REPO_NAME}.git"

if git remote get-url origin >/dev/null 2>&1; then
  git remote set-url origin "$REMOTE_URL"
else
  git remote add origin "$REMOTE_URL"
fi

echo "Pushing main ..."
git push "https://x-access-token:${GITHUB_TOKEN}@github.com/${GITHUB_OWNER}/${REPO_NAME}.git" main

echo "Done. Remote: ${REMOTE_URL}"
