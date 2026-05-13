---
"@savvycal/appointments-core": patch
---

**Changed: client_data input schemas** -- The `client_data` input on appointment and booking intent endpoints is now exposed as named, reusable schemas: AppointmentClientDataInput (appointment creates) and ClientDataInput (booking intent create/update). Shapes are unchanged; the `fields` description has been tightened to clarify that each key must correspond to a Client Field defined in the account. See https://developers.savvycal.app/api/schemas/appointmentclientdatainput and https://developers.savvycal.app/api/schemas/clientdatainput.
