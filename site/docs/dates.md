---
---

# Working with Dates

The SavvyCal API uses string-based date and time values in several formats. Understanding these formats — and the differences between how dates appear in responses versus requests — will help you integrate correctly.

## Date Formats

| Format | Example | Where Used |
| --- | --- | --- |
| ISO date | `2025-10-27` | Calendar dates (e.g., block `start_date`) |
| ISO datetime | `2025-03-01T03:00:00Z` | UTC timestamps (e.g., `created_at`, `updated_at`) |
| Naive datetime | `2025-03-01T10:00:00` | Local time without timezone info (used in request bodies) |
| Time | `09:00` | Time of day (e.g., schedule rule `start_time`) |

## ZonedDateTime

Several response fields (such as appointment `start_at` and `end_at`) return a **ZonedDateTime** object instead of a plain string. This object provides the same moment in multiple representations:

```json
{
  "object": "zoned_date_time",
  "local": "2025-03-01T10:00:00",
  "utc": "2025-03-01T15:00:00Z",
  "unix_ts": 1740841200,
  "time_zone": "America/New_York"
}
```

| Field | Description |
| --- | --- |
| `local` | Naive datetime in the event's local timezone |
| `utc` | ISO datetime in UTC |
| `unix_ts` | Unix timestamp in seconds |
| `time_zone` | IANA timezone identifier |
| `object` | Always `"zoned_date_time"` |

## Slots

The [public slots endpoint](/api/list-public-service-slots) returns **Slot** objects representing bookable time windows:

```json
{
  "object": "slot",
  "start_at": "2025-03-10T09:00:00-04:00",
  "start_at_ts": 1741612800,
  "end_at": "2025-03-10T10:00:00-04:00",
  "end_at_ts": 1741616400,
  "time_zone": "America/New_York"
}
```

| Field | Description |
| --- | --- |
| `start_at` / `end_at` | ISO datetime with timezone offset |
| `start_at_ts` / `end_at_ts` | Unix timestamps in seconds |
| `time_zone` | IANA timezone identifier |

## Creating Appointments

When creating an appointment, the API expects **naive datetime** strings paired with a separate `time_zone` field — not the ZonedDateTime objects you see in responses.

```json
{
  "service_id": "svc_01JN5EQ4G6FXR5DEWCB1BNXGYQ",
  "start_at": "2025-03-01T10:00:00",
  "end_at": "2025-03-01T11:00:00",
  "time_zone": "America/New_York"
}
```

The `start_at` and `end_at` values represent **local times** in the given timezone. Do not include a `Z` suffix or UTC offset — the `time_zone` field determines how these times are interpreted.

:::note
Responses use ZonedDateTime objects with multiple representations, but requests expect plain naive datetime strings plus a timezone. This asymmetry is intentional: it keeps request payloads simple while giving you rich data in responses.
:::

## JavaScript SDK

The `@savvycal/appointments` SDK passes date values through as strings and numbers, matching the wire format exactly. For convenience helpers, install `@savvycal/appointments-utils`:

```bash
npm install @savvycal/appointments-utils
```

Common operations:

```ts
import {
  fromUnixTime,
  toISONaiveDateTime,
  isSameDay,
} from "@savvycal/appointments-utils";

// Convert a slot's unix timestamp to a Date
const date = fromUnixTime(slot.start_at_ts);

// Format a Date as a naive datetime for a create request
const naive = toISONaiveDateTime(date, "America/New_York");
// => "2025-03-01T10:00:00"

// Compare two dates in a specific timezone
isSameDay(date1, date2, "America/New_York");
// => true
```
