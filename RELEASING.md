# Releasing

This project uses [Changesets](https://github.com/changesets/changesets) for version management and publishing.

## Adding a changeset

When you make changes that should be released, run:

```bash
pnpm changeset
```

This will prompt you to:
1. Select the packages that have changed
2. Choose the bump type (major, minor, patch)
3. Write a summary of the changes

Commit the generated changeset file along with your changes.

## Publishing releases

Releases are automated via GitHub Actions using [npm trusted publishing](https://docs.npmjs.com/trusted-publishers/) with OIDC (no npm tokens required):

1. When PRs with changesets are merged to `main`, the action creates/updates a "Version Packages" PR
2. This PR bumps versions and updates changelogs based on the changesets
3. Merging the "Version Packages" PR triggers the publish to npm

## npm trusted publisher setup

Each package must be configured on npmjs.com to trust this repository's workflow:

1. Go to the package settings on npmjs.com (e.g., https://www.npmjs.com/package/@savvycal/appointments-core/access)
2. Under "Publishing access", add a trusted publisher with:
   - **Repository owner**: `svycal`
   - **Repository name**: `appointments`
   - **Workflow filename**: `release.yml`
   - **Environment**: (leave blank)

## Manual release (if needed)

Local manual release does **not** use GitHub trusted publishing (OIDC). You must authenticate to npm as a user with publish access to the `@savvycal` packages.

Use the helper script:

```bash
pnpm release:manual
```

Script options:

```bash
pnpm release:manual -- --yes
pnpm release:manual -- --skip-version
pnpm release:manual -- --skip-push
```

### 1) Refresh npm auth locally

Preferred (interactive web login):

```bash
npm logout --registry=https://registry.npmjs.org || true
npm login --auth-type=web --registry=https://registry.npmjs.org
npm whoami
```

Token-based fallback (non-interactive):
1. In npmjs.com, create a new **granular access token** with **read/write publish** permissions for the `@savvycal` packages.
2. Use it for just this shell session:

```bash
export NPM_TOKEN="<paste-token>"
export NPM_CONFIG_USERCONFIG="$(mktemp)"
printf "registry=https://registry.npmjs.org/\n//registry.npmjs.org/:_authToken=%s\n" "$NPM_TOKEN" > "$NPM_CONFIG_USERCONFIG"
npm whoami
```

### 2) Verify publish access before releasing

```bash
npm access list packages "$(npm whoami)" | rg "@savvycal/appointments-(core|react-query|utils)"
npm view @savvycal/appointments-core version
```

### 3) Run the manual release commands (if you are not using the helper script)

```bash
pnpm version   # bump versions + changelogs from changesets
pnpm release   # builds packages and runs changeset publish
```

### 4) Push release commits/tags

```bash
git push --follow-tags
```

If you used the token-based fallback:

```bash
rm -f "$NPM_CONFIG_USERCONFIG"
unset NPM_TOKEN NPM_CONFIG_USERCONFIG
```

## Troubleshooting manual publish

- `npm notice Access token expired or revoked`:
  Re-auth with `npm login` or create a fresh granular token.
- `E404 Not Found - PUT https://registry.npmjs.org/@scope%2fpkg` for an existing package:
  Usually auth/permissions (not package existence). Confirm `npm whoami` and `npm access list packages "$(npm whoami)"`.
- `Unknown env config "shamefully-hoist"` warnings:
  These are harmless warnings from npm reading pnpm-related env vars.
