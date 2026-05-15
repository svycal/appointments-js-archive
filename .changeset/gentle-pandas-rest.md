---
"@savvycal/appointments-core": minor
---

**New:** -- Provider schedules now have a `time_zone` field. [ProviderSchedule](https://developers.savvycal.app/api/schemas/providerschedule) responses include the IANA time zone the schedule's weekly rules are authored in, and the [Create Provider Schedule](https://developers.savvycal.app/api/create-provider-schedule) and [Update Provider Schedule](https://developers.savvycal.app/api/update-provider-schedule) endpoints accept an optional `time_zone` to declare it; when omitted, it defaults to the provider's time zone.
