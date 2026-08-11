---
"@savvycal/appointments-core": minor
---

**New: Role permissions** -- Added endpoints for retrieving and updating roles: [Get Role](https://developers.savvycal.app/api/get-role) and [Update Role](https://developers.savvycal.app/api/update-role). Use `denied_permissions` on [Update Role](https://developers.savvycal.app/api/update-role) to narrow a built-in role (denials win over baseline grants, including wildcards); superuser roles cannot have denials. See [UpdateRoleRequest](https://developers.savvycal.app/api/schemas/updaterolerequest) and [RoleResponse](https://developers.savvycal.app/api/schemas/roleresponse).
