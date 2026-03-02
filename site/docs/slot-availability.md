---
---

# Slot Availability

This guide explains how SavvyCal calculates available time slots for a service and how to query them through the API.

## How availability is calculated

When you query for available time slots, SavvyCal runs a pipeline that starts with candidate slots and progressively removes unavailable times:

```
Slot Rules (Service) ──▶ Generate candidate slots ──▶ Remove unavailable slots ──▶ Available slots
```

Each stage of the pipeline works as follows:

1. **Slot generation** — The service's `slot_rules` define when slots begin (day of week, start/end time, recurrence pattern). The service `duration` determines the length of each slot. Together, these produce a set of candidate time slots for the requested date range.

2. **Provider working hours** — Each provider's [`ProviderSchedule`](/data-model#provider-schedules) defines `weekly_rules` with working hours per day of the week. Candidate slots that fall outside a provider's working hours for the effective date range are removed.

3. **Existing appointments** — Any scheduled [`Appointment`](/data-model#appointments) that overlaps a candidate slot removes that slot from availability.

4. **Blocks** — Any [`Block`](/data-model#blocks) that overlaps a candidate slot removes it, regardless of the block's `attachment_type` (provider, service, service\_provider, or location).

5. **Connected calendar conflicts** — When a provider has a [connected calendar account](/connected-accounts) (Google Calendar, Microsoft 365), busy times from the external calendar are removed from availability.

6. **Booking intent slot holds** — Active holds from [`BookingIntents`](/booking-intents#slot-holding) temporarily remove held slots until the hold expires or the intent is completed or abandoned.

## Querying available slots

Three endpoints return slot availability data:

| Endpoint | Path | Auth | Use case |
| --- | --- | --- | --- |
| [List available time slots](/api/list-service-slots) | `GET /v1/services/{service_id}/slots` | API key | Server-side UI with per-provider breakdowns |
| [List available time slots (public)](/api/list-public-service-slots) | `GET /v1/public/services/{service_id}/slots` | None | Client-facing booking UI |
| [Get earliest available slot](/api/get-earliest-public-service-slot) | `GET /v1/public/services/{service_id}/earliest_slot` | None | "Next available" display |

The public endpoints only return slots for providers whose [`ProviderSchedule`](/data-model#provider-schedules) has `public_bookings.enabled` set to `true`.

## Request parameters

The authenticated and public list endpoints share these query parameters:

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `service_id` | string | Yes (path) | The service to query slots for. |
| `from` | ISO date | No | Start of the date range. Defaults to today. |
| `until` | ISO date | Conditional | End of the date range. Either `until` or `limit` is required. |
| `limit` | integer | Conditional | Maximum number of aggregated slots to return. Either `limit` or `until` is required. |
| `time_zone` | string | No | IANA time zone (e.g., `America/New_York`). Defaults to `Etc/UTC`. |
| `provider_ids` | string | No | Comma-separated provider IDs to filter by. |

The earliest-slot endpoint accepts only `service_id` (path), `time_zone`, and `provider_ids`.

### Authenticated request

```bash
curl -G "https://api.savvycal.app/v1/services/srv_d025a96ac0c6/slots" \
  -H "Authorization: Bearer sk_live_..." \
  -d from=2025-03-10 \
  -d until=2025-03-14 \
  -d time_zone=America/New_York
```

### Public request

```bash
curl -G "https://api.savvycal.app/v1/public/services/srv_d025a96ac0c6/slots" \
  -H "X-SavvyCal-Account: acct_d025a96ac0c6" \
  -d from=2025-03-10 \
  -d limit=10 \
  -d time_zone=America/New_York
```

### Earliest slot request

```bash
curl -G "https://api.savvycal.app/v1/public/services/srv_d025a96ac0c6/earliest_slot" \
  -H "X-SavvyCal-Account: acct_d025a96ac0c6" \
  -d time_zone=America/New_York
```

## Response structure

### Authenticated response

The authenticated endpoint returns a [`ServiceSlotResponse`](/api/schemas/serviceslotresponse) with two arrays inside `data`: `aggregated_slots` (deduplicated by time, with a `count` of available providers) and `provider_slots` (per-provider breakdowns).

```json
{
  "data": {
    "aggregated_slots": [
      {
        "object": "aggregated_slot",
        "start_at": "2025-03-10T09:00:00-04:00",
        "start_at_ts": 1741615200,
        "end_at": "2025-03-10T10:00:00-04:00",
        "end_at_ts": 1741618800,
        "time_zone": "America/New_York",
        "count": 2
      }
    ],
    "provider_slots": [
      {
        "service_provider": {
          "object": "service_provider",
          "id": "sp_d025a96ac0c6",
          "service_id": "srv_d025a96ac0c6",
          "provider": {
            "object": "provider",
            "id": "prov_d025a96ac0c6",
            "display_name": "Dr. Evelyn Brooks"
          }
        },
        "open": [
          {
            "object": "slot",
            "start_at": "2025-03-10T09:00:00-04:00",
            "start_at_ts": 1741615200,
            "end_at": "2025-03-10T10:00:00-04:00",
            "end_at_ts": 1741618800,
            "time_zone": "America/New_York"
          }
        ]
      }
    ]
  }
}
```

[`AggregatedSlot`](/api/schemas/aggregatedslot) properties:

| Property | Type | Description |
| --- | --- | --- |
| `object` | string | Always `"aggregated_slot"`. |
| `start_at` | string | Offset-aware ISO datetime in the requested time zone. |
| `start_at_ts` | integer | Unix timestamp in seconds. |
| `end_at` | string | Offset-aware ISO datetime in the requested time zone. |
| `end_at_ts` | integer | Unix timestamp in seconds. |
| `time_zone` | string | IANA time zone name. |
| `count` | integer | Number of providers available for this slot. |

### Public response

The public list endpoint returns a [`PublicServiceSlotsResponse`](/api/schemas/publicserviceslotsresponse) with a flat `data` array of [`Slot`](/api/schemas/slot) objects.

```json
{
  "data": [
    {
      "object": "slot",
      "start_at": "2025-03-10T09:00:00-04:00",
      "start_at_ts": 1741615200,
      "end_at": "2025-03-10T10:00:00-04:00",
      "end_at_ts": 1741618800,
      "time_zone": "America/New_York"
    }
  ]
}
```

### Earliest slot response

The earliest-slot endpoint returns a [`PublicServiceEarliestSlotResponse`](/api/schemas/publicserviceearliestslotresponse) where `data` is a single [`Slot`](/api/schemas/slot) object, or `null` if no slots are available.

```json
{
  "data": {
    "object": "slot",
    "start_at": "2025-03-10T09:00:00-04:00",
    "start_at_ts": 1741615200,
    "end_at": "2025-03-10T10:00:00-04:00",
    "end_at_ts": 1741618800,
    "time_zone": "America/New_York"
  }
}
```

[`Slot`](/api/schemas/slot) properties (used by both public responses):

| Property | Type | Description |
| --- | --- | --- |
| `object` | string | Always `"slot"`. |
| `start_at` | string | Offset-aware ISO datetime in the requested time zone. |
| `start_at_ts` | integer | Unix timestamp in seconds. |
| `end_at` | string | Offset-aware ISO datetime in the requested time zone. |
| `end_at_ts` | integer | Unix timestamp in seconds. |
| `time_zone` | string | IANA time zone name. |

## Time zone handling

The `time_zone` query parameter controls two things:

1. **Offset in returned datetime strings** — The `start_at` and `end_at` values include the UTC offset for the requested time zone (e.g., `-04:00` for `America/New_York` during EDT).
2. **Date boundary interpretation** — The `from` and `until` date parameters are interpreted as dates in the requested time zone.

The default time zone is `Etc/UTC`. Unix timestamps (`start_at_ts`, `end_at_ts`) are absolute and unaffected by the time zone parameter.

See [Working with Dates — Slots](/dates#slots) for more on slot date formats.

## What affects availability

This table summarizes the resources that influence slot availability:

| Resource | Effect | Learn more |
| --- | --- | --- |
| `SlotRule` | Defines candidate start times and recurrence | [Data Model — Services](/data-model#services) |
| Service `duration` | Determines slot length | [Service schema](/api/schemas/service) |
| `ProviderSchedule` `weekly_rules` | Filters to working hours | [Data Model — Provider Schedules](/data-model#provider-schedules) |
| `ProviderSchedule` `public_bookings` | Controls public endpoint visibility | [ProviderSchedule schema](/api/schemas/providerschedule) |
| `Appointment` | Removes booked slots | [Data Model — Appointments](/data-model#appointments) |
| `Block` | Removes blocked time ranges | [Data Model — Blocks](/data-model#blocks) |
| `ConnectedAccount` (calendar) | Removes externally busy times | [Connected Accounts](/connected-accounts) |
| `BookingIntent` hold | Temporarily removes held slots | [Booking Intents — Slot holding](/booking-intents#slot-holding) |
