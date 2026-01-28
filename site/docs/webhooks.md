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
| `appointment.created`              | Emitted when a new appointment is created. ([Schema](/api/schemas/appointmentcreatedeventdata))                            |
| `appointment.rescheduled`          | Emitted when an existing appointment is rescheduled. ([Schema](/api/schemas/appointmentrescheduledeventdata))              |
| `appointment.canceled`             | Emitted when an existing appointment is canceled. ([Schema](/api/schemas/appointmentcanceledeventdata))                    |
| `appointment.confirmed`            | Emitted when an existing appointment is confirmed. ([Schema](/api/schemas/appointmentconfirmedeventdata))                  |
| `appointment.deleted`              | Emitted when an existing appointment is deleted. ([Schema](/api/schemas/appointmentdeletedeventdata))                      |
| `block.created`                    | Emitted when a new block is created. ([Schema](/api/schemas/blockcreatedeventdata))                                        |
| `block.updated`                    | Emitted when an existing block is updated. ([Schema](/api/schemas/blockupdatedeventdata))                                  |
| `block.deleted`                    | Emitted when an existing block is deleted. ([Schema](/api/schemas/blockdeletedeventdata))                                  |
| `connected_account.created`        | Emitted when a new calendar integration is connected. ([Schema](/api/schemas/connectedaccountcreatedeventdata))            |
| `connected_account.deleted`        | Emitted when a calendar integration is disconnected. ([Schema](/api/schemas/connectedaccountdeletedeventdata))             |
| `connected_account.refresh_failed` | Emitted when an OAuth token refresh permanently fails. ([Schema](/api/schemas/connectedaccountrefreshfailedeventdata))     |
| `connected_account.reconnected`    | Emitted when a previously failed integration is reconnected. ([Schema](/api/schemas/connectedaccountreconnectedeventdata)) |
