---
"@savvycal/appointments-core": patch
---

**Changed:** -- The `X-SavvyCal-Account` header is no longer listed as a parameter on individual operations in the OpenAPI spec or API reference; it's now documented once on the [Platforms](https://developers.savvycal.app/platforms) and [Authentication](https://developers.savvycal.app/authentication) pages. The header is unchanged at the protocol level — it is still required when authenticating with a platform token to specify the target account.
