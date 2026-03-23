---
"@savvycal/appointments-core": minor
"@savvycal/appointments-react-query": minor
---

**Changed: BookingIntent hold fields restructured** -- The `hold_duration` and `hold_enabled` fields on BookingIntent, CreateBookingIntentRequest, and UpdateBookingIntentRequest have been replaced with a nested `booking_policy` object. Hold settings are now at `booking_policy.hold.duration` and `booking_policy.hold.enabled`. See [BookingIntent](https://developers.savvycal.app/api/schemas/bookingintent).
