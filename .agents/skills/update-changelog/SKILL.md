---
name: update-changelog
description: Update the API changelog and create changeset files for new or modified API endpoints, schemas, and fields.
allowed-tools: Bash(git diff *), Bash(pnpm changeset *), Read, Write, Edit, Glob, Grep
---

# Update API Changelog

Use this skill when the user asks to update the API changelog (e.g., `/update-changelog`).

## Steps

1. **Determine what changed.** If the user describes the changes, use that. Otherwise, inspect staged and unstaged git changes (`git diff --cached` and `git diff`) focusing on `packages/core/src/schema.yml` and the generated files under `site/docs/api/`.

2. **Read the existing changelog** at `site/docs/changelog.md`.

3. **Add or update a date section.** Use today's date as the section heading (e.g., `## March 5, 2026`). If a section for today already exists, append new entries to it. Sections are in reverse chronological order (newest first, right after the intro paragraph).

4. **Format entries** as a bulleted list:
   - Start each entry with a **bold label** followed by an em dash (`--`):
     - `**New:**` -- new endpoints, schemas, or fields
     - `**Changed:**` -- modifications to existing behavior or fields
     - `**Deprecated:**` -- features marked for future removal
     - `**Removed:**` -- removed endpoints, schemas, or fields
     - `**Fixed:**` -- bug fixes
   - After the em dash, write a concise description of the change.
   - Link to relevant API reference pages using relative paths (e.g., `[BookingIntent](/api/schemas/bookingintent)`).

5. **Create changeset files** using the [Changesets](https://github.com/changesets/changesets) convention. Create **one changeset file per changelog bullet point** so that each entry renders cleanly in the Changesets-generated package changelog (Changesets prepends contributor info to each file's content, so multi-bullet files produce awkward formatting).
   - For each changelog entry, create a file at `.changeset/<random-name>.md` where `<random-name>` is a unique random three-word slug (e.g., `bright-dogs-smile.md`). Use `pnpm changeset add --empty` to generate empty files, then edit each one.
   - Each file has YAML front matter listing affected packages and their bump levels, followed by a single-line Markdown description (no bullet prefix).
   - **Determine affected packages** by inspecting which directories under `packages/` have changes:
     - `packages/core/` → `"@savvycal/appointments-core"`
     - `packages/react-query/` → `"@savvycal/appointments-react-query"`
     - `packages/utils/` → `"@savvycal/appointments-utils"`
   - **Determine bump level** for each affected package (use the highest level across all changeset files):
     - `major` -- breaking changes (removed/renamed endpoints, changed response shapes, removed fields)
     - `minor` -- new features (new endpoints, new schemas, new fields on existing types)
     - `patch` -- bug fixes, doc-only changes, or non-functional tweaks
   - The Markdown body should mirror the corresponding changelog entry, but written as a plain sentence (not a bullet) and with full URLs (e.g., `https://developers.savvycal.app/api/schemas/bookingintent`) instead of relative paths.
   - Example — for a changelog with 2 entries, create 2 files:

     ```
     // .changeset/bright-dogs-smile.md
     ---
     "@savvycal/appointments-core": minor
     "@savvycal/appointments-react-query": minor
     ---

     **New: Booking Intents** -- Added endpoints for managing multi-step booking flows. See [Booking Intents](https://developers.savvycal.app/api/create-booking-intent).
     ```

     ```
     // .changeset/warm-lions-dance.md
     ---
     "@savvycal/appointments-core": minor
     ---

     **New: Hold Policy** -- Services now include a `hold` field within `booking_policy`. See [HoldPolicy](https://developers.savvycal.app/api/schemas/holdpolicy).
     ```

6. **Show the user the new changelog entries and changeset files** and confirm before saving.
