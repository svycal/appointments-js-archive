---
sidebar_label: Changelog
---

# API Changelog

A log of notable changes to the SavvyCal Appointments API.

## April 30, 2026

- **New:** -- Added two endpoints for listing time slots based on a booking intent's configuration: [List available slots for a booking intent](/api/list-booking-intent-slots) (authenticated) and [List available slots for a booking intent](/api/list-public-booking-intent-slots) (public). Both return the new [SlotListResponse](/api/schemas/slotlistresponse) schema.
- **New:** -- [Appointment](/api/schemas/appointment) responses now include a `meeting` field with conferencing details (provider, join URL, password, etc.) and an asynchronous lifecycle status. See [AppointmentMeeting](/api/schemas/appointmentmeeting).
- **New:** -- Added webhook events for the appointment meeting lifecycle: `appointment.meeting.created`, `appointment.meeting.updated`, `appointment.meeting.canceled`, and `appointment.meeting.replaced`, plus terminal-failure events `appointment.meeting.create_failed`, `appointment.meeting.update_failed`, `appointment.meeting.cancel_failed`, and `appointment.meeting.replace_failed`. See [AppointmentMeetingCreatedEventData](/api/schemas/appointmentmeetingcreatedeventdata), [AppointmentMeetingUpdatedEventData](/api/schemas/appointmentmeetingupdatedeventdata), [AppointmentMeetingCanceledEventData](/api/schemas/appointmentmeetingcanceledeventdata), [AppointmentMeetingReplacedEventData](/api/schemas/appointmentmeetingreplacedeventdata), [AppointmentMeetingCreateFailedEventData](/api/schemas/appointmentmeetingcreatefailedeventdata), [AppointmentMeetingUpdateFailedEventData](/api/schemas/appointmentmeetingupdatefailedeventdata), [AppointmentMeetingCancelFailedEventData](/api/schemas/appointmentmeetingcancelfailedeventdata), and [AppointmentMeetingReplaceFailedEventData](/api/schemas/appointmentmeetingreplacefailedeventdata).
- **New:** -- Booking intents now support secondary providers via a `secondary_providers` field on [CreateBookingIntentRequest](/api/schemas/createbookingintentrequest), [UpdateBookingIntentRequest](/api/schemas/updatebookingintentrequest), and [BookingIntent](/api/schemas/bookingintent).
- **New:** -- [Appointment](/api/schemas/appointment) responses now include a `providers` array containing each assigned provider with their role (`primary` or `secondary`). See [AppointmentProvider](/api/schemas/appointmentprovider).
- **New:** -- [Dashboard sessions](/api/schemas/dashboardsession) now support an `idle_timeout_minutes` field for configuring the inactivity period before re-authentication is required. See [Create Dashboard Session](/api/create-dashboard-session).
- **Changed:** -- The `source` field on [ConfirmationEvent](/api/schemas/confirmationevent) and [RescheduleEvent](/api/schemas/rescheduleevent) now includes a `public_api` value to distinguish events initiated through the public API.
- **Changed:** -- The `PublicServiceSlotsResponse` schema has been renamed to [SlotListResponse](/api/schemas/slotlistresponse) and is now used by both authenticated and public slot listing endpoints. The response shape is unchanged.

## March 25, 2026

- **New:** -- Booking intents now include `requirements` and `workflow` fields. Requirements provides per-section completeness status for booking, info, and form submission steps. Workflow provides server-computed step routing, completability, and defunct state. See [BookingIntentRequirements](/api/schemas/bookingintentrequirements), [BookingIntentWorkflow](/api/schemas/bookingintentworkflow), and [SubmissionRequirement](/api/schemas/submissionrequirement).
- **Changed:** -- The `locked_fields` field on [BookingIntent](/api/schemas/bookingintent), [PublicBookingIntent](/api/schemas/publicbookingintent), and related request schemas is now a typed enum array instead of a freeform string array.
- **Changed:** -- The `locked_fields` enum values `start_at`, `end_at`, and `time_zone` have been consolidated into a single `slot` value on [BookingIntent](/api/schemas/bookingintent), [PublicBookingIntent](/api/schemas/publicbookingintent), and related request schemas.

## March 23, 2026

- **New:** -- Added a [BookingIntentBookingPolicy](/api/schemas/bookingintentbookingpolicy) schema representing hold policy overrides applied to a booking intent.
- **Changed:** -- The `hold_duration` and `hold_enabled` fields on [BookingIntent](/api/schemas/bookingintent), [CreateBookingIntentRequest](/api/schemas/createbookingintentrequest), and [UpdateBookingIntentRequest](/api/schemas/updatebookingintentrequest) have been replaced with a nested `booking_policy` object. Hold settings are now at `booking_policy.hold.duration` and `booking_policy.hold.enabled`.

## March 21, 2026

- **New:** -- Booking intents now include a `submissions` field for attaching form responses during the booking flow. See [BookingIntent](/api/schemas/bookingintent) and [IntentSubmissionInput](/api/schemas/intentsubmissioninput).
- **New:** -- The [Get Client](/api/get-client) and [List Clients](/api/list-clients) endpoints now support an `include_sensitive` query parameter for controlling whether sensitive fields (name, email, phone) are included in the response.
- **New:** -- Booking intents now include an `errors` field containing validation errors in JSON:API format. See [BookingIntent](/api/schemas/bookingintent) and [JsonError](/api/schemas/jsonerror).
- **New:** -- Added a [JsonError](/api/schemas/jsonerror) schema representing a single validation error object.

## March 20, 2026

- **New: Forms** -- Added endpoints for managing intake forms with typed fields: [Create Form](/api/create-form), [Get Form](/api/get-form), [List Forms](/api/list-forms), [Update Form](/api/update-form), and [Delete Form](/api/delete-form). See [Form](/api/schemas/form).
- **New: Client Fields** -- Added endpoints for managing custom client fields: [Create Client Field](/api/create-client-field), [Get Client Field](/api/get-client-field), [List Client Fields](/api/list-client-fields), [Update Client Field](/api/update-client-field), and [Delete Client Field](/api/delete-client-field). See [ClientField](/api/schemas/clientfield).
- **New: Service Forms** -- Added endpoints for attaching forms to services: [Attach Service Form](/api/attach-service-form), [List Service Forms](/api/list-service-forms), [Sort Service Forms](/api/sort-service-forms), and [Detach Service Form](/api/detach-service-form). See [ServiceForm](/api/schemas/serviceform).
- **New:** -- Services now include a `forms` field containing attached intake forms. See [Service](/api/schemas/service).

## March 10, 2026

- **Removed:** -- The deprecated `client_locale`, `client_reference_id`, `client_time_zone`, and `fields` properties have been removed from the [Appointment](/api/schemas/appointment) schema. Use `client_data` instead.

## March 5, 2026

- **New:** -- Clients and services now support a `metadata` field for storing custom key-value pairs (maximum 16 KB). See [Client](/api/schemas/client) and [Service](/api/schemas/service).
- **New:** -- The [List Clients](/api/list-clients) and [List Services](/api/list-services) endpoints now support filtering by `metadata` using bracket notation.
- **New:** -- Added a [ForbiddenResponse](/api/schemas/forbiddenresponse) schema and 403 status code to the [List Appointments](/api/list-appointments) endpoint.

## March 2, 2026

- **New:** -- Services now include an optional `internal_name` field for setting an internal admin label. When set, this name is displayed in the admin UI instead of the public name. See [Service](/api/schemas/service).

## March 1, 2026

- **New:** -- Services now include a `provider_notifications` field for configuring staff email notification settings, including which notification types are enabled and additional recipients. See [ProviderNotificationConfig](/api/schemas/providernotificationconfig) and [ProviderNotificationType](/api/schemas/providernotificationtype).

## February 27, 2026

- **New:** -- [PublicAppointment](/api/schemas/publicappointment) now includes a `urls` field containing client-facing action URLs for rescheduling, canceling, adding to calendar, downloading ICS files, and adding to Google Calendar.

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
