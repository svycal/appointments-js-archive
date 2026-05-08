---
"@savvycal/appointments-core": minor
---

**New:** -- [Appointment](https://developers.savvycal.app/api/schemas/appointment) and [PublicAppointment](https://developers.savvycal.app/api/schemas/publicappointment) now expose individual top-level URL fields. [Appointment](https://developers.savvycal.app/api/schemas/appointment) exposes `add_to_calendar_url`, `cancel_url`, `confirm_url`, `ics_url`, `join_url`, and `reschedule_url`. [PublicAppointment](https://developers.savvycal.app/api/schemas/publicappointment) exposes `add_to_calendar_url`, `cancel_url`, `ics_url`, and `reschedule_url`. Each is a single canonical URL string that resolves to the account's active custom domain when configured. There is no top-level replacement for `urls.add_to_google_calendar`; use `add_to_calendar_url` instead.
