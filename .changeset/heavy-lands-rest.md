---
"@savvycal/appointments-core": minor
---

**New:** -- The [Create Provider](https://developers.savvycal.app/api/create-provider) and [Update Provider](https://developers.savvycal.app/api/update-provider) endpoints now accept an optional `time_zone` field for setting the provider's preferred IANA time zone. When omitted on create, it defaults to the account location's time zone. See [CreateProviderRequest](https://developers.savvycal.app/api/schemas/createproviderrequest) and [UpdateProviderRequest](https://developers.savvycal.app/api/schemas/updateproviderrequest).
