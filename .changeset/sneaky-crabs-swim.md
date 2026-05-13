---
"@savvycal/appointments-core": patch
---

**Changed:** -- Corrected the documented stability guarantees for `host_url` on [AppointmentMeeting](https://developers.savvycal.app/api/schemas/appointmentmeeting). The proxy URL is *generally* stable across `appointment.meeting.updated` events but may change if SavvyCal rotates the underlying token, and always changes when the meeting is replaced. Consumers caching `host_url` should listen for both `appointment.meeting.updated` and `appointment.meeting.replaced` to keep stored copies fresh. Types and runtime behavior are unchanged; only the schema description was updated.
