# @savvycal/appointments-core

## 0.8.0

### Minor Changes

- [`fee8ef7`](https://github.com/svycal/appointments/commit/fee8ef7f95e3d7b169ebb8be29c47070190032e9) Thanks [@derrickreimer](https://github.com/derrickreimer)! - **Changed: Slots query parameters** -- The `from` and `until` query parameters on the [List available time slots](https://developers.savvycal.app/api/list-service-slots) and [List public time slots](https://developers.savvycal.app/api/list-public-service-slots) endpoints are now optional. `from` defaults to today if not provided. Either `until` or `limit` must be provided.

- [`fee8ef7`](https://github.com/svycal/appointments/commit/fee8ef7f95e3d7b169ebb8be29c47070190032e9) Thanks [@derrickreimer](https://github.com/derrickreimer)! - **New: Slots limit parameter** -- Added a `limit` query parameter to the [List available time slots](https://developers.savvycal.app/api/list-service-slots) and [List public time slots](https://developers.savvycal.app/api/list-public-service-slots) endpoints as an alternative to `until` for controlling the number of aggregated slots returned.

- [`2e0d0b0`](https://github.com/svycal/appointments/commit/2e0d0b0c361fec79239f405d057b2bc5debb8913) Thanks [@derrickreimer](https://github.com/derrickreimer)! - - **New: Booking Intents** -- Added 6 authenticated endpoints under `/v1/booking_intents` and 5 public endpoints under `/v1/public/booking_intents` for managing multi-step booking flows with time slot holding. See [Booking Intents](https://developers.savvycal.app/api/create-booking-intent) and [Public Booking Intents](https://developers.savvycal.app/api/create-public-booking-intent).
  - **New: Hold Policy** -- Services now include a `hold` field within `booking_policy` for configuring time slot holds during the booking flow. See [HoldPolicy](https://developers.savvycal.app/api/schemas/holdpolicy) and [BookingPolicy](https://developers.savvycal.app/api/schemas/bookingpolicy).
  - **New: Booking Intent schemas** -- Added [BookingIntent](https://developers.savvycal.app/api/schemas/bookingintent), [PublicBookingIntent](https://developers.savvycal.app/api/schemas/publicbookingintent), [HoldPolicy](https://developers.savvycal.app/api/schemas/holdpolicy), and related request/response types.

## 0.7.0

### Minor Changes

- [`8f5493c`](https://github.com/svycal/appointments/commit/8f5493cacf7c38468def077222e707b7f0b091b0) Thanks [@derrickreimer](https://github.com/derrickreimer)! - Clarify offset-aware datetimes for local

## 0.6.0

### Minor Changes

- [#7](https://github.com/svycal/appointments/pull/7) [`db01ba0`](https://github.com/svycal/appointments/commit/db01ba026150e03550e4ecd6d3b2d989ab63d9db) Thanks [@derrickreimer](https://github.com/derrickreimer)! - Update APIs to use offset-aware timestamps

## 0.5.0

### Minor Changes

- [`5d3a2f7`](https://github.com/svycal/appointments/commit/5d3a2f72a67c0d410df6203afedc4c852f65d1c3) Thanks [@derrickreimer](https://github.com/derrickreimer)! - API updates

## 0.4.0

### Minor Changes

- [`492c6a6`](https://github.com/svycal/appointments/commit/492c6a6186812528b0c281b2a05bd37e6432d6e5) Thanks [@derrickreimer](https://github.com/derrickreimer)! - Support for Connected Accounts API

## 0.3.0

### Minor Changes

- [#2](https://github.com/svycal/appointments/pull/2) [`088fcfa`](https://github.com/svycal/appointments/commit/088fcfa9c258fcc3c23b372f389c798830125555) Thanks [@derrickreimer](https://github.com/derrickreimer)! - Update API schema

## 0.2.0

### Minor Changes

- [`d7de927`](https://github.com/svycal/appointments/commit/d7de92704307917c35190e687edb82a64613e0a1) Thanks [@derrickreimer](https://github.com/derrickreimer)! - Update types to align with REST API updates
