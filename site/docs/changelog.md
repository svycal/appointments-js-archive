---
sidebar_label: Changelog
---

# API Changelog

A log of notable changes to the SavvyCal Appointments API.

## February 26, 2026

- **New:** -- Error responses now include an optional `code` field containing a machine-readable error code (e.g. `slot_unavailable`, `no_available_provider`). See [GenericErrorResponse](/api/schemas/genericerrorresponse) and [JsonErrorResponse](/api/schemas/jsonerrorresponse).

## February 25, 2026

- **Changed:** -- The `from` and `until` query parameters on the [List available time slots](/api/list-service-slots) and [List public time slots](/api/list-public-service-slots) endpoints are now optional. `from` defaults to today if not provided. Either `until` or `limit` must be provided.
- **New:** -- Added a `limit` query parameter to the [List available time slots](/api/list-service-slots) and [List public time slots](/api/list-public-service-slots) endpoints as an alternative to `until` for controlling the number of aggregated slots returned.
- **New:** -- Added webhook events for booking intents: `booking_intent.created`, `booking_intent.updated`, `booking_intent.completed`, and `booking_intent.abandoned`. See [Webhooks](/webhooks).
- **New:** -- Booking intent endpoints now accept an `auto_assign_provider` flag. When `true`, an available provider is automatically assigned for the selected time slot if no `provider_id` is specified. Supported on create, update, and complete operations for both [authenticated](/api/create-booking-intent) and [public](/api/create-public-booking-intent) booking intents.

## February 24, 2026

- **New: Booking Intents** -- Added 6 authenticated endpoints under `/v1/booking_intents` and 5 public endpoints under `/v1/public/booking_intents` for managing multi-step booking flows with time slot holding. See [Booking Intents](/api/create-booking-intent) and [Public Booking Intents](/api/create-public-booking-intent).
- **New: Hold Policy** -- Services now include a `hold` field within `booking_policy` for configuring time slot holds during the booking flow. See [HoldPolicy](/api/schemas/holdpolicy) and [BookingPolicy](/api/schemas/bookingpolicy).
- **New: Booking Intent schemas** -- Added [BookingIntent](/api/schemas/bookingintent), [PublicBookingIntent](/api/schemas/publicbookingintent), [HoldPolicy](/api/schemas/holdpolicy), and related request/response types.
