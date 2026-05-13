---
"@savvycal/appointments-core": minor
---

**New: client_data fields** -- The `client_data` object on Appointment and BookingIntent responses now includes a `fields` map containing custom client field values, keyed by field slug. Values for fields flagged as sensitive are redacted unless `include_sensitive` is `true`. See https://developers.savvycal.app/api/schemas/appointment and https://developers.savvycal.app/api/schemas/bookingintent.
