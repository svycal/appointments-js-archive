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

```bash
pnpm version   # Bump versions and update changelogs
pnpm release   # Build and publish to npm
```
