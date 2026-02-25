---
"@savvycal/appointments-core": minor
---

**Changed: Slots query parameters** -- The `from` and `until` query parameters on the [List available time slots](https://developers.savvycal.app/api/list-service-slots) and [List public time slots](https://developers.savvycal.app/api/list-public-service-slots) endpoints are now optional. `from` defaults to today if not provided. Either `until` or `limit` must be provided.
