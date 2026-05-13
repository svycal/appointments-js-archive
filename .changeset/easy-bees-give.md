---
"@savvycal/appointments-core": minor
---

**New: AppointmentMeeting host_url** -- AppointmentMeeting now includes a stable `host_url` proxy URL the meeting host follows to start the meeting. Treat as a credential — anyone with this URL can start the meeting as host. Valid through the appointment's end time + 24h grace window. See https://developers.savvycal.app/api/schemas/appointmentmeeting.
