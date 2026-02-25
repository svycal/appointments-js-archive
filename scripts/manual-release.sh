#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

PACKAGES=(
  "@savvycal/appointments-core"
  "@savvycal/appointments-react-query"
  "@savvycal/appointments-utils"
)

SKIP_VERSION=0
SKIP_PUSH=0
YES=0

usage() {
  cat <<'EOF'
Usage: ./scripts/manual-release.sh [options]

Options:
  --yes            Skip confirmation prompt
  --skip-version   Skip "pnpm version"
  --skip-push      Skip "git push --follow-tags"
  -h, --help       Show this help
EOF
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --)
      shift
      continue
      ;;
    --yes)
      YES=1
      shift
      ;;
    --skip-version)
      SKIP_VERSION=1
      shift
      ;;
    --skip-push)
      SKIP_PUSH=1
      shift
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      echo "Unknown option: $1" >&2
      usage
      exit 1
      ;;
  esac
done

echo "Checking npm authentication..."
if ! NPM_USER="$(npm whoami 2>/dev/null)"; then
  cat <<'EOF' >&2
Failed to authenticate with npm.

Run one of:
  npm login --auth-type=web --registry=https://registry.npmjs.org

Or token-based auth:
  export NPM_TOKEN="<token>"
  export NPM_CONFIG_USERCONFIG="$(mktemp)"
  printf "registry=https://registry.npmjs.org/\n//registry.npmjs.org/:_authToken=%s\n" "$NPM_TOKEN" > "$NPM_CONFIG_USERCONFIG"
EOF
  exit 1
fi
echo "Authenticated to npm as: $NPM_USER"

echo "Checking npm package access..."
if ACCESS_JSON="$(npm access list packages "$NPM_USER" --json 2>/dev/null)"; then
  MISSING=()
  for pkg in "${PACKAGES[@]}"; do
    if ! printf '%s' "$ACCESS_JSON" | grep -Fq "\"$pkg\""; then
      MISSING+=("$pkg")
    fi
  done
  if [[ ${#MISSING[@]} -gt 0 ]]; then
    echo "Warning: access check did not include these packages:" >&2
    for pkg in "${MISSING[@]}"; do
      echo "  - $pkg" >&2
    done
    echo "If publish fails with E404/E403, verify npm package permissions." >&2
  fi
else
  echo "Warning: could not verify package access via 'npm access list packages'." >&2
  echo "Continuing anyway because auth succeeded." >&2
fi

echo "Verifying package visibility on npm registry..."
for pkg in "${PACKAGES[@]}"; do
  if ! npm view "$pkg" version >/dev/null; then
    echo "Could not read package metadata for $pkg. Check npm auth and registry settings." >&2
    exit 1
  fi
done

if [[ "$YES" -eq 0 ]]; then
  cat <<'EOF'
About to run:
  1) pnpm version
  2) pnpm release
  3) git push --follow-tags
EOF
  if [[ "$SKIP_VERSION" -eq 1 ]]; then
    echo "  (step 1 skipped)"
  fi
  if [[ "$SKIP_PUSH" -eq 1 ]]; then
    echo "  (step 3 skipped)"
  fi
  read -r -p "Proceed? [y/N] " confirm
  if [[ ! "$confirm" =~ ^[Yy]$ ]]; then
    echo "Cancelled."
    exit 0
  fi
fi

if [[ "$SKIP_VERSION" -eq 0 ]]; then
  echo "Running pnpm version..."
  pnpm version
else
  echo "Skipping pnpm version."
fi

echo "Running pnpm release..."
pnpm release

if [[ "$SKIP_PUSH" -eq 0 ]]; then
  echo "Pushing release commits and tags..."
  git push --follow-tags
else
  echo "Skipping git push."
fi

echo "Manual release flow completed."
