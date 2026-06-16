---
"@savvycal/appointments-core": minor
"@savvycal/appointments-react-query": minor
---

**Changed: Set User Mapping** -- [Set User Mapping](https://developers.savvycal.app/api/set-user-mapping) now refreshes a connected account's external users from the provider and retries once when an `email` matches no existing external user, so a freshly-added user can be mapped without a manual sync. A 502 is now returned (instead of a 422) when the refresh cannot reach the provider (e.g. the connection needs to be re-authorized).
