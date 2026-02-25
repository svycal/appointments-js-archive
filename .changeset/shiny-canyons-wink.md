---
"@savvycal/appointments-core": minor
---

**New: Auto-assign provider** -- Booking intent endpoints now accept an `auto_assign_provider` flag. When `true`, an available provider is automatically assigned for the selected time slot if no `provider_id` is specified. Supported on create, update, and complete operations for both [authenticated](https://developers.savvycal.app/api/create-booking-intent) and [public](https://developers.savvycal.app/api/create-public-booking-intent) booking intents.
