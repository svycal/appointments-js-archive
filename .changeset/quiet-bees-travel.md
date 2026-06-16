---
"@savvycal/appointments-core": minor
"@savvycal/appointments-react-query": minor
---

**New: Sync External Users** -- Added a [Sync External Users](https://developers.savvycal.app/api/sync-connected-account-external-users) endpoint for refreshing a connected account's external users from the provider on demand (e.g. pulling the current list of Zoom users). New users are added, existing ones updated, and removed ones deleted; it returns the full refreshed list. See [SyncExternalUsersResponse](https://developers.savvycal.app/api/schemas/syncexternalusersresponse).
