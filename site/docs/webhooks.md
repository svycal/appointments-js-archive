---
---

# Webhooks

## Registering a webhook

Visit the [Webhooks](https://savvycal.app/webhooks) page in the SavvyCal Dashboard and follow the prompts to register a new webhook.

For platforms, register webhooks on the platform settings page under the "Platform webhooks" section.

## Listening for events

When an event occurs that triggers a webhook, we will send an HTTP POST to the URL you specified, with a JSON-encoded body of this shape:

```
POST /my-webhook-receiver HTTP/1.1

host: https://myapp.com
user-agent: SavvyCal Webhooks (https://savvycal.app)
x-savvycal-signature: sha256=6CAA4DEF5C3463B785E885FF19B8987B348E19399D2C5FB291274EDFA7128105
x-savvycal-webhook-id: wh_XXXXXXXXXX
content-type: application/json

{
  "id": "evt_d025a96ac0c6",
  "account_id": "acct_d025a96ac0c6",
  "version": "1.0",
  "created_at": "2025-03-12T12:34:55Z",
  "data": {
    "type": "appointment.created",
    "object": {...}
  }
}
```

## Event types

The following event types are available. The Schema definitions referenced in the table below represent the shape of the `data` field in the webhook payload.

| Event Type                         | Description                                                                                                                |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `account_user.created`             | Emitted when a new account user is created. ([Schema](/api/schemas/accountusercreatedeventdata))                           |
| `account_user.deleted`             | Emitted when an account user is removed. ([Schema](/api/schemas/accountuserdeletedeventdata))                              |
| `account_user.updated`             | Emitted when an existing account user is updated. ([Schema](/api/schemas/accountuserupdatedeventdata))                     |
| `appointment.created`              | Emitted when a new appointment is created. ([Schema](/api/schemas/appointmentcreatedeventdata))                            |
| `appointment.rescheduled`          | Emitted when an existing appointment is rescheduled. ([Schema](/api/schemas/appointmentrescheduledeventdata))              |
| `appointment.canceled`             | Emitted when an existing appointment is canceled. ([Schema](/api/schemas/appointmentcanceledeventdata))                    |
| `appointment.confirmed`            | Emitted when an existing appointment is confirmed. ([Schema](/api/schemas/appointmentconfirmedeventdata))                  |
| `appointment.deleted`              | Emitted when an existing appointment is deleted. ([Schema](/api/schemas/appointmentdeletedeventdata))                      |
| `block.created`                    | Emitted when a new block is created. ([Schema](/api/schemas/blockcreatedeventdata))                                        |
| `block.updated`                    | Emitted when an existing block is updated. ([Schema](/api/schemas/blockupdatedeventdata))                                  |
| `block.deleted`                    | Emitted when an existing block is deleted. ([Schema](/api/schemas/blockdeletedeventdata))                                  |
| `client.created`                   | Emitted when a new client is created. ([Schema](/api/schemas/clientcreatedeventdata))                                      |
| `client.deleted`                   | Emitted when a client is deleted. ([Schema](/api/schemas/clientdeletedeventdata))                                          |
| `client.updated`                   | Emitted when an existing client is updated. ([Schema](/api/schemas/clientupdatedeventdata))                                |
| `connected_account.created`        | Emitted when a new calendar integration is connected. ([Schema](/api/schemas/connectedaccountcreatedeventdata))            |
| `connected_account.deleted`        | Emitted when a calendar integration is disconnected. ([Schema](/api/schemas/connectedaccountdeletedeventdata))             |
| `connected_account.refresh_failed` | Emitted when an OAuth token refresh permanently fails. ([Schema](/api/schemas/connectedaccountrefreshfailedeventdata))     |
| `connected_account.reconnected`    | Emitted when a previously failed integration is reconnected. ([Schema](/api/schemas/connectedaccountreconnectedeventdata)) |
| `provider.created`                 | Emitted when a new provider is created. ([Schema](/api/schemas/providercreatedeventdata))                                  |
| `provider.deactivated`             | Emitted when a provider is deactivated. ([Schema](/api/schemas/providerdeactivatedeventdata))                              |
| `provider.reactivated`             | Emitted when a previously deactivated provider is reactivated. ([Schema](/api/schemas/providerreactivatedeventdata))       |
| `provider.updated`                 | Emitted when an existing provider is updated. ([Schema](/api/schemas/providerupdatedeventdata))                            |
| `provider_schedule.created`        | Emitted when a new provider schedule is created. ([Schema](/api/schemas/providerschedulecreatedeventdata))                 |
| `provider_schedule.deleted`        | Emitted when a provider schedule is deleted. ([Schema](/api/schemas/providerscheduledeletedeventdata))                     |
| `provider_schedule.updated`        | Emitted when an existing provider schedule is updated. ([Schema](/api/schemas/providerscheduleupdatedeventdata))           |
| `service.created`                  | Emitted when a new service is created. ([Schema](/api/schemas/servicecreatedeventdata))                                    |
| `service.deleted`                  | Emitted when a service is deleted. ([Schema](/api/schemas/servicedeletedeventdata))                                        |
| `service.updated`                  | Emitted when an existing service is updated. ([Schema](/api/schemas/serviceupdatedeventdata))                              |
| `service_provider.created`         | Emitted when a provider is added to a service. ([Schema](/api/schemas/serviceprovidercreatedeventdata))                    |
| `service_provider.deleted`         | Emitted when a provider is removed from a service. ([Schema](/api/schemas/serviceproviderdeletedeventdata))                |

## Sensitive fields

Webhook payloads err on the side of caution when it comes to personally identifiable information. Fields like `first_name`, `last_name`, `email`, and `phone` on client objects will be `null` in webhook payloads.

If you need access to these fields, fetch the full record via the API after receiving the webhook. For example, after receiving a `client.created` event, you can call `GET /v1/clients/:id` to retrieve the complete client data.
