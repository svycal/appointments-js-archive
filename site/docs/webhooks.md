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

## Verifying signatures

Each webhook delivery includes an `x-savvycal-signature` header containing an HMAC-SHA256 signature of the raw request body. You can use this to verify that the payload was sent by SavvyCal and has not been tampered with.

To find your webhook's signing secret, open the webhook in the [Webhooks](https://savvycal.app/webhooks) page in the SavvyCal Dashboard. The signing secret is displayed in the edit panel.

To verify a signature:

1. Read the raw request body (before any JSON parsing).
2. Compute the HMAC-SHA256 digest of the body using your webhook's signing secret as the key.
3. Hex-encode the digest in uppercase and prepend `sha256=`.
4. Compare the result to the `x-savvycal-signature` header value using a constant-time comparison function.

### JavaScript

```javascript
const crypto = require('crypto');

function verifyWebhookSignature(rawBody, secret, signatureHeader) {
  const digest = crypto
    .createHmac('sha256', secret)
    .update(rawBody)
    .digest('hex')
    .toUpperCase();

  const expected = `sha256=${digest}`;

  return (
    expected.length === signatureHeader.length &&
    crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signatureHeader))
  );
}
```

### Ruby

```ruby
require 'openssl'

def verify_webhook_signature(raw_body, secret, signature_header)
  digest = OpenSSL::HMAC.hexdigest('SHA256', secret, raw_body).upcase
  expected = "sha256=#{digest}"

  Rack::Utils.secure_compare(expected, signature_header)
end
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
| `appointment.meeting.canceled`        | Emitted after a meeting is canceled with the conferencing provider. ([Schema](/api/schemas/appointmentmeetingcanceledeventdata)) |
| `appointment.meeting.cancel_failed`   | Emitted when meeting cancellation with the conferencing provider terminally fails. ([Schema](/api/schemas/appointmentmeetingcancelfailedeventdata)) |
| `appointment.meeting.created`         | Emitted after a meeting is created with the conferencing provider. ([Schema](/api/schemas/appointmentmeetingcreatedeventdata)) |
| `appointment.meeting.create_failed`   | Emitted when initial meeting creation with the conferencing provider terminally fails. ([Schema](/api/schemas/appointmentmeetingcreatefailedeventdata)) |
| `appointment.meeting.replaced`        | Emitted after a meeting is replaced with a brand-new meeting at the conferencing provider, typically after a reschedule changes the primary provider. ([Schema](/api/schemas/appointmentmeetingreplacedeventdata)) |
| `appointment.meeting.replace_failed`  | Emitted when a meeting replacement with the conferencing provider terminally fails. ([Schema](/api/schemas/appointmentmeetingreplacefailedeventdata)) |
| `appointment.meeting.updated`         | Emitted after a meeting is updated with the conferencing provider. ([Schema](/api/schemas/appointmentmeetingupdatedeventdata)) |
| `appointment.meeting.update_failed`   | Emitted when a meeting update with the conferencing provider terminally fails. ([Schema](/api/schemas/appointmentmeetingupdatefailedeventdata)) |
| `booking_intent.abandoned`         | Emitted when a booking intent is abandoned. ([Schema](/api/schemas/bookingintentabandonedeventdata))                       |
| `booking_intent.completed`         | Emitted when a booking intent is completed. ([Schema](/api/schemas/bookingintentcompletedeventdata))                       |
| `booking_intent.created`           | Emitted when a new booking intent is created. ([Schema](/api/schemas/bookingintentcreatedeventdata))                       |
| `booking_intent.updated`           | Emitted when an existing booking intent is updated. ([Schema](/api/schemas/bookingintentupdatedeventdata))                 |
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
