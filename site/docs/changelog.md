---
sidebar_label: Changelog
---

# API Changelog

A log of notable changes to the SavvyCal Appointments API.

## June 12, 2026

- **New: Openings** -- Added endpoints for managing openings — one-off ranges of available time for a provider that sit alongside their recurring schedules: [Create Opening](/api/create-opening), [List Openings](/api/list-openings), [Get Opening](/api/get-opening), [Update Opening](/api/update-opening), and [Delete Opening](/api/delete-opening). See [Opening](/api/schemas/opening).
- **New:** -- Added webhook events for openings: `opening.created`, `opening.updated`, and `opening.deleted`. See [OpeningCreatedEventData](/api/schemas/openingcreatedeventdata), [OpeningUpdatedEventData](/api/schemas/openingupdatedeventdata), and [OpeningDeletedEventData](/api/schemas/openingdeletedeventdata).
- **New: Buffer Policy** -- Services now support a `buffer_policy` for shielding time before and/or after appointments from being booked (e.g. prep time before, charting time after). Configurable via [Create Service](/api/create-service) and [Update Service](/api/update-service). See [BufferPolicy](/api/schemas/bufferpolicy) and [Service](/api/schemas/service).
- **New:** -- [Appointment](/api/schemas/appointment) responses now include `buffer_policy`, `buffered_start_at`, and `buffered_end_at` fields. The buffer policy is captured at booking time and continues to shield the surrounding time even if the service configuration changes later; `buffered_start_at` and `buffered_end_at` equal `start_at` and `end_at` when no buffer applies.
- **New: User Mappings** -- Added endpoints for managing default mappings between providers and external users on connected accounts (e.g., the Zoom user whose account hosts meetings for a provider): [List User Mappings](/api/list-user-mappings), [Get User Mapping](/api/get-user-mapping), [Set User Mapping](/api/set-user-mapping), and [Delete User Mapping](/api/delete-user-mapping). Mappings can be set by external user ID or by email. See [UserMapping](/api/schemas/usermapping).
- **New:** -- Added a [List External Users](/api/list-connected-account-external-users) endpoint for listing users synced from a connected external account (e.g., Zoom users). See [ExternalUser](/api/schemas/externaluser).

## May 18, 2026

- **Changed:** -- The `X-SavvyCal-Account` header is no longer listed as a parameter on individual operations in the OpenAPI spec or API reference; it's now documented once on the [Platforms](/platforms) and [Authentication](/authentication) pages. The header is unchanged at the protocol level — it is still required when authenticating with a platform token to specify the target account.
- **New:** -- The [Create Provider](/api/create-provider) and [Update Provider](/api/update-provider) endpoints now accept an optional `time_zone` field for setting the provider's preferred IANA time zone. When omitted on create, it defaults to the account location's time zone. See [CreateProviderRequest](/api/schemas/createproviderrequest) and [UpdateProviderRequest](/api/schemas/updateproviderrequest).

## May 16, 2026

- **Changed:** -- The `start_date` and `end_date` fields on [Block](/api/schemas/block), [CreateBlockRequest](/api/schemas/createblockrequest), and [UpdateBlockRequest](/api/schemas/updateblockrequest) have been consolidated into a single `date` field. The [List Blocks](/api/list-blocks) endpoint's `start_date`, `end_date`, `start_date_min`, `start_date_max`, `end_date_min`, and `end_date_max` query parameters have likewise been replaced with `date`, `date_min`, and `date_max`, and results are now sorted by `date`.

## May 15, 2026

- **New:** -- [Provider](/api/schemas/provider) and [AppointmentProvider](/api/schemas/appointmentprovider) responses now include a `time_zone` field — the provider's preferred IANA time zone, used as the default when authoring schedules.
- **New:** -- Provider schedules now have a `time_zone` field. [ProviderSchedule](/api/schemas/providerschedule) responses include the IANA time zone the schedule's weekly rules are authored in, and the [Create Provider Schedule](/api/create-provider-schedule) and [Update Provider Schedule](/api/update-provider-schedule) endpoints accept an optional `time_zone` to declare it; when omitted, it defaults to the provider's time zone.

## May 12, 2026

- **New:** -- [AppointmentMeeting](/api/schemas/appointmentmeeting) now includes a `host_url` field — a proxy URL on the account's booking domain that the meeting host follows to start the meeting. SavvyCal refreshes the underlying conferencing-provider URL behind the proxy transparently, so the proxy URL is generally stable across `appointment.meeting.updated` events, though it may change if SavvyCal rotates the underlying token. It always changes when the meeting is replaced (e.g. a reschedule routes the appointment to a different host on the account, producing a brand-new meeting with a new `id`). **Treat as a credential** — anyone with this URL can start the meeting as host. Valid through the appointment's end time + a 24h grace window, then returns 410 Gone. Listen for `appointment.meeting.updated` and `appointment.meeting.replaced` to keep stored copies fresh. `null` when the meeting is not yet `created` or when the conferencing provider has no distinct host start URL (e.g., Google Meet).
- **New:** -- `client_data` on [Appointment](/api/schemas/appointment) and [BookingIntent](/api/schemas/bookingintent) now includes a `fields` map containing custom client field values, keyed by field slug. Values for fields flagged as sensitive are redacted unless `include_sensitive` is `true`.
- **Changed:** -- The `client_data` input on appointment and booking intent endpoints is now exposed as named, reusable schemas: [AppointmentClientDataInput](/api/schemas/appointmentclientdatainput) (used by [CreateAppointmentRequest](/api/schemas/createappointmentrequest) and [CreatePublicAppointmentRequest](/api/schemas/createpublicappointmentrequest)) and [ClientDataInput](/api/schemas/clientdatainput) (used by booking intent create/update requests). Shapes are unchanged; the `fields` description has been tightened to clarify that each key must correspond to a Client Field defined in the account — arbitrary key-value pairs are not accepted.

## May 7, 2026

- **New:** -- [Appointment](/api/schemas/appointment) and [PublicAppointment](/api/schemas/publicappointment) now expose individual top-level URL fields. [Appointment](/api/schemas/appointment) exposes `add_to_calendar_url`, `cancel_url`, `confirm_url`, `ics_url`, `join_url`, and `reschedule_url`. [PublicAppointment](/api/schemas/publicappointment) exposes `add_to_calendar_url`, `cancel_url`, `ics_url`, and `reschedule_url`. Each is a single canonical URL string that resolves to the account's active custom domain when configured. There is no top-level replacement for `urls.add_to_google_calendar`; use `add_to_calendar_url` instead.
- **Deprecated:** -- The `urls` object on [Appointment](/api/schemas/appointment) and [PublicAppointment](/api/schemas/publicappointment) is deprecated in favor of the new top-level URL fields and will be removed in a future release.

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
