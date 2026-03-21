# @savvycal/appointments-core

## 1.1.0

### Minor Changes

- [`c97027d`](https://github.com/svycal/appointments/commit/c97027dfbc89af12f95b5a8cfcd61c903c4f7ac4) Thanks [@derrickreimer](https://github.com/derrickreimer)! - **New:** -- Added a [JsonError](https://developers.savvycal.app/api/schemas/jsonerror) schema representing a single validation error object.

- [`c97027d`](https://github.com/svycal/appointments/commit/c97027dfbc89af12f95b5a8cfcd61c903c4f7ac4) Thanks [@derrickreimer](https://github.com/derrickreimer)! - **New:** -- Booking intents now include an `errors` field containing validation errors in JSON:API format. See [BookingIntent](https://developers.savvycal.app/api/schemas/bookingintent) and [JsonError](https://developers.savvycal.app/api/schemas/jsonerror).

## 1.0.0

### Major Changes

- [`1f5086d`](https://github.com/svycal/appointments/commit/1f5086ddb4fbd3bc12761a2af2a4bd2d1d432e61) Thanks [@derrickreimer](https://github.com/derrickreimer)! - **Removed:** -- The deprecated `client_locale`, `client_reference_id`, `client_time_zone`, and `fields` properties have been removed from the [Appointment](https://developers.savvycal.app/api/schemas/appointment) schema. Use `client_data` instead.

### Minor Changes

- [`bcce16e`](https://github.com/svycal/appointments/commit/bcce16e6ce85e3ccf6702a0d4f4005f9f0b28116) Thanks [@derrickreimer](https://github.com/derrickreimer)! - **New:** -- Services now include a `forms` field containing attached intake forms. See [Service](https://developers.savvycal.app/api/schemas/service).

- [`bcce16e`](https://github.com/svycal/appointments/commit/bcce16e6ce85e3ccf6702a0d4f4005f9f0b28116) Thanks [@derrickreimer](https://github.com/derrickreimer)! - **New: Client Fields** -- Added endpoints for managing custom client fields. See [ClientField](https://developers.savvycal.app/api/schemas/clientfield).

- [`bcce16e`](https://github.com/svycal/appointments/commit/bcce16e6ce85e3ccf6702a0d4f4005f9f0b28116) Thanks [@derrickreimer](https://github.com/derrickreimer)! - **New: Service Forms** -- Added endpoints for attaching forms to services. See [ServiceForm](https://developers.savvycal.app/api/schemas/serviceform).

- [`bcce16e`](https://github.com/svycal/appointments/commit/bcce16e6ce85e3ccf6702a0d4f4005f9f0b28116) Thanks [@derrickreimer](https://github.com/derrickreimer)! - **New: Forms** -- Added endpoints for managing intake forms with typed fields. See [Form](https://developers.savvycal.app/api/schemas/form).

- [`25cc645`](https://github.com/svycal/appointments/commit/25cc64504aa421ee2165cc7a1d5b611739c1a2d8) Thanks [@derrickreimer](https://github.com/derrickreimer)! - **New:** -- Booking intents now include a `submissions` field for attaching form responses during the booking flow. See [BookingIntent](https://developers.savvycal.app/api/schemas/bookingintent) and [IntentSubmissionInput](https://developers.savvycal.app/api/schemas/intentsubmissioninput).

- [`25cc645`](https://github.com/svycal/appointments/commit/25cc64504aa421ee2165cc7a1d5b611739c1a2d8) Thanks [@derrickreimer](https://github.com/derrickreimer)! - **New:** -- The [Get Client](https://developers.savvycal.app/api/get-client) and [List Clients](https://developers.savvycal.app/api/list-clients) endpoints now support an `include_sensitive` query parameter for controlling whether sensitive fields (name, email, phone) are included in the response.

## 0.14.0

### Minor Changes

- [`6f2d384`](https://github.com/svycal/appointments/commit/6f2d38429915945123e213702cbc85b28823e081) Thanks [@derrickreimer](https://github.com/derrickreimer)! - **New: Metadata** -- Clients and services now support a `metadata` field for storing custom key-value pairs (maximum 16 KB). See [Client](https://developers.savvycal.app/api/schemas/client) and [Service](https://developers.savvycal.app/api/schemas/service).

- [`6f2d384`](https://github.com/svycal/appointments/commit/6f2d38429915945123e213702cbc85b28823e081) Thanks [@derrickreimer](https://github.com/derrickreimer)! - **New: ForbiddenResponse** -- Added a [ForbiddenResponse](https://developers.savvycal.app/api/schemas/forbiddenresponse) schema and 403 status code to the [List Appointments](https://developers.savvycal.app/api/list-appointments) endpoint.

- [`6f2d384`](https://github.com/svycal/appointments/commit/6f2d38429915945123e213702cbc85b28823e081) Thanks [@derrickreimer](https://github.com/derrickreimer)! - **New: Metadata Filtering** -- The [List Clients](https://developers.savvycal.app/api/list-clients) and [List Services](https://developers.savvycal.app/api/list-services) endpoints now support filtering by `metadata` using bracket notation.

## 0.13.0

### Minor Changes

- [`c6d6e59`](https://github.com/svycal/appointments/commit/c6d6e598c93688cef5a436d95af9f536c8cc5b8e) Thanks [@derrickreimer](https://github.com/derrickreimer)! - **New:** -- Services now include an optional `internal_name` field for setting an internal admin label. When set, this name is displayed in the admin UI instead of the public name. See [Service](https://developers.savvycal.app/api/schemas/service).

## 0.12.0

### Minor Changes

- [`00e1891`](https://github.com/svycal/appointments/commit/00e18913091a8109d9604b985b11df1d5219ba4c) Thanks [@derrickreimer](https://github.com/derrickreimer)! - **New:** -- Services now include a `provider_notifications` field for configuring staff email notification settings, including which notification types are enabled and additional recipients. See [ProviderNotificationConfig](https://developers.savvycal.app/api/schemas/providernotificationconfig) and [ProviderNotificationType](https://developers.savvycal.app/api/schemas/providernotificationtype).

## 0.11.0

### Minor Changes

- [`72045cd`](https://github.com/svycal/appointments/commit/72045cd8d7bb770f5b8c5f20262d86a6f4aec808) Thanks [@derrickreimer](https://github.com/derrickreimer)! - **New:** -- PublicAppointment now includes a `urls` field containing client-facing action URLs for rescheduling, canceling, adding to calendar, downloading ICS files, and adding to Google Calendar. See [PublicAppointment](https://developers.savvycal.app/api/schemas/publicappointment).

## 0.10.0

### Minor Changes

- [`3bac651`](https://github.com/svycal/appointments/commit/3bac6511150190728ff9d92280f5b55b46e167e7) Thanks [@derrickreimer](https://github.com/derrickreimer)! - **New:** -- Error responses now include an optional `code` field containing a machine-readable error code (e.g. `slot_unavailable`, `no_available_provider`). See [GenericErrorResponse](https://developers.savvycal.app/api/schemas/genericerrorresponse) and [JsonErrorResponse](https://developers.savvycal.app/api/schemas/jsonerrorresponse).

## 0.9.0

### Minor Changes

- [`8bac62c`](https://github.com/svycal/appointments/commit/8bac62cb03f0609482624ed98cce9f2264a6e43f) Thanks [@derrickreimer](https://github.com/derrickreimer)! - **New: Auto-assign provider** -- Booking intent endpoints now accept an `auto_assign_provider` flag. When `true`, an available provider is automatically assigned for the selected time slot if no `provider_id` is specified. Supported on create, update, and complete operations for both [authenticated](https://developers.savvycal.app/api/create-booking-intent) and [public](https://developers.savvycal.app/api/create-public-booking-intent) booking intents.

- [`8bac62c`](https://github.com/svycal/appointments/commit/8bac62cb03f0609482624ed98cce9f2264a6e43f) Thanks [@derrickreimer](https://github.com/derrickreimer)! - **New: Booking intent webhook events** -- Added webhook events for booking intents: `booking_intent.created`, `booking_intent.updated`, `booking_intent.completed`, and `booking_intent.abandoned`. See [Webhooks](https://developers.savvycal.app/webhooks).

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
