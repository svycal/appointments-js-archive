---
"@savvycal/appointments-core": patch
---

**Changed: Provider Schedule request docs** -- Removed a misleading `default: true` annotation from `public_bookings.enabled` on the Create Provider Schedule and Update Provider Schedule request schemas; the field is required, so no default applies. See https://developers.savvycal.app/api/schemas/createproviderschedulerequest and https://developers.savvycal.app/api/schemas/updateproviderschedulerequest.
