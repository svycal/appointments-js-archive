---
"@savvycal/appointments-core": minor
---

**New: Appointment buffer fields** -- [Appointment](https://developers.savvycal.app/api/schemas/appointment) responses now include `buffer_policy`, `buffered_start_at`, and `buffered_end_at` fields. The buffer policy is captured at booking time and continues to shield the surrounding time even if the service configuration changes later.
