---
---

# Booking Intents

A [`BookingIntent`](/api/schemas/bookingintent) tracks the lifecycle of a multi-step booking attempt, enabling slot holding and progressive data collection before creating an appointment.

Booking intents are useful when your booking flow spans multiple steps or screens. Rather than collecting all information upfront and creating an appointment in a single call, you can create a booking intent early in the flow, hold the selected time slot so it isn't taken by someone else, and gradually attach data as the user progresses. When the user confirms, you complete the intent and an [`Appointment`](/api/schemas/appointment) is created.

## Lifecycle

A booking intent moves through these statuses:

```
pending ──▶ slot_selected ──▶ completed
                │
                └──▶ abandoned
```

| Status          | Description                                                                                                         |
| --------------- | ------------------------------------------------------------------------------------------------------------------- |
| `pending`       | The initial status. No time slot has been selected yet.                                                             |
| `slot_selected` | A time slot has been selected (`start_at` and `end_at` are set). The slot may be held depending on the hold policy. |
| `completed`     | The booking intent has been completed and an [`Appointment`](/api/schemas/appointment) has been created.            |
| `abandoned`     | The booking intent has been explicitly abandoned. Any active slot hold is released.                                 |

Status transitions happen automatically. When you update a booking intent to include `start_at` and `end_at`, the status transitions from `pending` to `slot_selected`. You don't set the status directly — it is derived from the state of the intent.

## Slot holding

Slot holding prevents double-booking by temporarily blocking a time slot while the user completes the booking flow. When enabled, the selected slot is blocked from availability for other callers until the hold expires or the intent is completed or abandoned.

Configure slot holding with these fields:

| Field           | Type    | Description                                                                                                                |
| --------------- | ------- | -------------------------------------------------------------------------------------------------------------------------- |
| `hold_enabled`  | boolean | Whether slot holding is enabled. When omitted at creation, falls back to the service's hold policy.                        |
| `hold_duration` | string  | The hold duration as an ISO 8601 duration string (e.g., `PT10M` for 10 minutes). Falls back to the service's hold policy.  |
| `hold_until`    | string  | Read-only. The UTC datetime when the current hold expires. Set automatically when a slot is selected with holding enabled. |

When a service is set on the booking intent, the service's default hold policy (the "Hold selected slots" setting under Booking Policy) is automatically applied unless `hold_enabled` or `hold_duration` is explicitly provided when creating or updating the booking intent.

When a hold expires, the slot becomes available to other callers again. The booking intent itself remains in `slot_selected` status — an expired hold does not abandon the intent.

## Progressive client data

The `client_data` field lets you collect client information incrementally across multiple updates. Each update **merges** the provided fields with existing values rather than replacing them entirely.

For example, you might collect the client's name on one screen and their email on the next:

```bash
# Step 1: Collect name
curl -X PATCH /v1/booking_intents/:id \
  -d '{"client_data": {"first_name": "Jane", "last_name": "Doe"}}'

# Step 2: Collect email
curl -X PATCH /v1/booking_intents/:id \
  -d '{"client_data": {"email": "jane@example.com"}}'
```

After both updates, `client_data` contains all three fields. When the booking intent is completed, this data is used to create or match a [`Client`](/api/schemas/client) and populate the resulting appointment.

The available `client_data` fields are: `first_name`, `last_name`, `email`, `phone`, `locale`, `time_zone`, and `reference_id`.

## Completing a booking intent

To complete a booking intent, call the [Complete booking intent](/api/complete-booking-intent) endpoint. Completion requires:

- The status must be `slot_selected` (a time slot must be set).
- A service must be assigned.

The complete endpoint accepts the same update fields as the update endpoint (`service_id`, `provider_id`, `start_at`, `end_at`, `client_data`, etc.). These fields are applied atomically before the intent is completed, so you can finalize data and complete in a single request.

On success, the booking intent transitions to `completed` status and the resulting [`Appointment`](/api/schemas/appointment) is available in the `appointment` field of the response.

## Abandoning a booking intent

Call the [Abandon booking intent](/api/abandon-booking-intent) endpoint to explicitly abandon a booking intent. This releases any active slot hold and transitions the status to `abandoned`.

Abandon a booking intent when the user exits the booking flow without completing it, so the held slot is freed up for other callers.

## Authenticated vs. public API

Booking intents are available through two API surfaces:

- **Authenticated API** — Uses your API key. Full control over all fields. Returns the complete [`BookingIntent`](/api/schemas/bookingintent) object.
- **Public API** — No API key required. Intended for client-side use. Restricted capabilities and returns a simplified [`PublicBookingIntent`](/api/schemas/publicbookingintent) object that omits sensitive and admin-only fields.

A common pattern is to use the authenticated API on your server to create a booking intent with pre-configured settings and locked fields, then hand the intent ID to the client to complete the flow via the public API.

| Capability                           | Authenticated API | Public API |
| ------------------------------------ | :---------------: | :--------: |
| Create / update / complete           |        Yes        |    Yes     |
| Abandon                              |        Yes        |    Yes     |
| List / get                           |        Yes        |  Get only  |
| Set `hold_enabled` / `hold_duration` |        Yes        |     No     |
| Set `locked_fields`                  |        Yes        |     No     |
| Set `metadata`                       |        Yes        |     No     |
| Set `slot_prevalidated`              |        Yes        |     No     |
| Link `client_id`                     |        Yes        |     No     |
| Returns full object                  |        Yes        |     No     |

## Locked fields

The authenticated API can lock specific fields so that the public API cannot modify them. This is useful when your server pre-selects values (like a service or provider) that the end user should not be able to change.

Set `locked_fields` when creating or updating a booking intent via the authenticated API:

```bash
curl -X POST /v1/booking_intents \
  -d '{
    "service_id": "srv_1234567890",
    "locked_fields": ["service_id", "provider_id"]
  }'
```

The lockable fields are: `service_id`, `provider_id`, `start_at`, `end_at`, `time_zone`, and `client_data`.

When updating via the authenticated API, `locked_fields` replaces the existing set entirely.

## Auto-assigning a provider

Set `auto_assign_provider` to `true` when you want the system to automatically select an available provider for the chosen time slot. This is useful when your flow lets the user pick a time without choosing a specific provider.

Auto-assignment is evaluated when a time slot is selected, so the held slot is reserved for a specific provider's schedule and remains bookable at completion. If a `provider_id` is also specified, the explicit provider takes precedence.

## Webhook events

Four webhook events are emitted during the booking intent lifecycle:

| Event                      | Description                       |
| -------------------------- | --------------------------------- |
| `booking_intent.created`   | A new booking intent was created. |
| `booking_intent.updated`   | A booking intent was updated.     |
| `booking_intent.completed` | A booking intent was completed.   |
| `booking_intent.abandoned` | A booking intent was abandoned.   |

See the [Webhooks](/webhooks) guide for details on registering webhooks and handling events.

## Key properties

| Property        | Type                                        | Description                                                                  |
| --------------- | ------------------------------------------- | ---------------------------------------------------------------------------- |
| `id`            | string                                      | The unique identifier (e.g., `bi_d025a96ac0c6`).                             |
| `status`        | enum                                        | The current status: `pending`, `slot_selected`, `completed`, or `abandoned`. |
| `start_at`      | [ZonedDateTime](/api/schemas/zoneddatetime) | The start time of the selected slot.                                         |
| `end_at`        | [ZonedDateTime](/api/schemas/zoneddatetime) | The end time of the selected slot.                                           |
| `hold_until`    | string                                      | When the current slot hold expires (UTC).                                    |
| `client_data`   | object                                      | Progressive client data collected during the booking flow.                   |
| `locked_fields` | array                                       | Fields locked from update via the public API.                                |
| `appointment`   | [Appointment](/api/schemas/appointment)     | The resulting appointment (set when completed).                              |

See the [BookingIntent](/api/schemas/bookingintent) schema for complete details.
