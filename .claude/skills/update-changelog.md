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

5. **Show the user the new entries** and confirm before saving.
