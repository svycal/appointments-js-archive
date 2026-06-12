# @savvycal/appointments-core

## 1.10.0

### Minor Changes

- [#39](https://github.com/svycal/appointments/pull/39) [`1e7646e`](https://github.com/svycal/appointments/commit/1e7646e3c8ca7d46d0d2e2cac58a754c646c3f9a) Thanks [@derrickreimer](https://github.com/derrickreimer)! - **New: Appointment buffer fields** -- [Appointment](https://developers.savvycal.app/api/schemas/appointment) responses now include `buffer_policy`, `buffered_start_at`, and `buffered_end_at` fields. The buffer policy is captured at booking time and continues to shield the surrounding time even if the service configuration changes later.

- [#39](https://github.com/svycal/appointments/pull/39) [`1e7646e`](https://github.com/svycal/appointments/commit/1e7646e3c8ca7d46d0d2e2cac58a754c646c3f9a) Thanks [@derrickreimer](https://github.com/derrickreimer)! - **New: Opening webhook events** -- Added webhook events for openings: `opening.created`, `opening.updated`, and `opening.deleted`. See [OpeningCreatedEventData](https://developers.savvycal.app/api/schemas/openingcreatedeventdata), [OpeningUpdatedEventData](https://developers.savvycal.app/api/schemas/openingupdatedeventdata), and [OpeningDeletedEventData](https://developers.savvycal.app/api/schemas/openingdeletedeventdata).

- [#39](https://github.com/svycal/appointments/pull/39) [`1e7646e`](https://github.com/svycal/appointments/commit/1e7646e3c8ca7d46d0d2e2cac58a754c646c3f9a) Thanks [@derrickreimer](https://github.com/derrickreimer)! - **New: Buffer Policy** -- Services now support a `buffer_policy` for shielding time before and/or after appointments from being booked (e.g. prep time before, charting time after). See [BufferPolicy](https://developers.savvycal.app/api/schemas/bufferpolicy) and [Service](https://developers.savvycal.app/api/schemas/service).

- [#39](https://github.com/svycal/appointments/pull/39) [`1e7646e`](https://github.com/svycal/appointments/commit/1e7646e3c8ca7d46d0d2e2cac58a754c646c3f9a) Thanks [@derrickreimer](https://github.com/derrickreimer)! - **New: List External Users** -- Added an endpoint for listing users synced from a connected external account (e.g., Zoom users). See [List External Users](https://developers.savvycal.app/api/list-connected-account-external-users) and [ExternalUser](https://developers.savvycal.app/api/schemas/externaluser).

- [#39](https://github.com/svycal/appointments/pull/39) [`1e7646e`](https://github.com/svycal/appointments/commit/1e7646e3c8ca7d46d0d2e2cac58a754c646c3f9a) Thanks [@derrickreimer](https://github.com/derrickreimer)! - **New: User Mappings** -- Added endpoints for managing default mappings between providers and external users on connected accounts (e.g., the Zoom user whose account hosts meetings for a provider). Mappings can be set by external user ID or by email. See [UserMapping](https://developers.savvycal.app/api/schemas/usermapping).

- [#39](https://github.com/svycal/appointments/pull/39) [`1e7646e`](https://github.com/svycal/appointments/commit/1e7646e3c8ca7d46d0d2e2cac58a754c646c3f9a) Thanks [@derrickreimer](https://github.com/derrickreimer)! - **New: Openings** -- Added endpoints for managing openings — one-off ranges of available time for a provider that sit alongside their recurring schedules. See [Openings](https://developers.savvycal.app/api/list-openings) and [Opening](https://developers.savvycal.app/api/schemas/opening).

## 1.9.0

### Minor Changes

- [#36](https://github.com/svycal/appointments/pull/36) [`10fc79c`](https://github.com/svycal/appointments/commit/10fc79cc755420c652cb9f4dc861e24b29cdde22) Thanks [@derrickreimer](https://github.com/derrickreimer)! - **New:** -- The [Create Provider](https://developers.savvycal.app/api/create-provider) and [Update Provider](https://developers.savvycal.app/api/update-provider) endpoints now accept an optional `time_zone` field for setting the provider's preferred IANA time zone. When omitted on create, it defaults to the account location's time zone. See [CreateProviderRequest](https://developers.savvycal.app/api/schemas/createproviderrequest) and [UpdateProviderRequest](https://developers.savvycal.app/api/schemas/updateproviderrequest).

### Patch Changes

- [#36](https://github.com/svycal/appointments/pull/36) [`10fc79c`](https://github.com/svycal/appointments/commit/10fc79cc755420c652cb9f4dc861e24b29cdde22) Thanks [@derrickreimer](https://github.com/derrickreimer)! - **Changed:** -- The `X-SavvyCal-Account` header is no longer listed as a parameter on individual operations in the OpenAPI spec or API reference; it's now documented once on the [Platforms](https://developers.savvycal.app/platforms) and [Authentication](https://developers.savvycal.app/authentication) pages. The header is unchanged at the protocol level — it is still required when authenticating with a platform token to specify the target account.

## 1.8.0

### Minor Changes

- [#35](https://github.com/svycal/appointments/pull/35) [`ccbedce`](https://github.com/svycal/appointments/commit/ccbedce0ccefbfd74ab16329aa186598076a79b1) Thanks [@derrickreimer](https://github.com/derrickreimer)! - **Changed:** -- The `start_date` and `end_date` fields on [Block](https://developers.savvycal.app/api/schemas/block), [CreateBlockRequest](https://developers.savvycal.app/api/schemas/createblockrequest), and [UpdateBlockRequest](https://developers.savvycal.app/api/schemas/updateblockrequest) have been consolidated into a single `date` field. The [List Blocks](https://developers.savvycal.app/api/list-blocks) endpoint's `start_date`, `end_date`, `start_date_min`, `start_date_max`, `end_date_min`, and `end_date_max` query parameters have likewise been replaced with `date`, `date_min`, and `date_max`, and results are now sorted by `date`.

- [#33](https://github.com/svycal/appointments/pull/33) [`a3a3255`](https://github.com/svycal/appointments/commit/a3a32554e8969364ca0154e0c265c6de591608fe) Thanks [@derrickreimer](https://github.com/derrickreimer)! - **New:** -- Provider schedules now have a `time_zone` field. [ProviderSchedule](https://developers.savvycal.app/api/schemas/providerschedule) responses include the IANA time zone the schedule's weekly rules are authored in, and the [Create Provider Schedule](https://developers.savvycal.app/api/create-provider-schedule) and [Update Provider Schedule](https://developers.savvycal.app/api/update-provider-schedule) endpoints accept an optional `time_zone` to declare it; when omitted, it defaults to the provider's time zone.

- [#33](https://github.com/svycal/appointments/pull/33) [`a3a3255`](https://github.com/svycal/appointments/commit/a3a32554e8969364ca0154e0c265c6de591608fe) Thanks [@derrickreimer](https://github.com/derrickreimer)! - **New:** -- [Provider](https://developers.savvycal.app/api/schemas/provider) and [AppointmentProvider](https://developers.savvycal.app/api/schemas/appointmentprovider) responses now include a `time_zone` field — the provider's preferred IANA time zone, used as the default when authoring schedules.

## 1.7.1

### Patch Changes

- [`dd2fdd6`](https://github.com/svycal/appointments/commit/dd2fdd6876ed23cf29918adeca68ac6f6af39660) Thanks [@derrickreimer](https://github.com/derrickreimer)! - **Changed:** -- Corrected the documented stability guarantees for `host_url` on [AppointmentMeeting](https://developers.savvycal.app/api/schemas/appointmentmeeting). The proxy URL is _generally_ stable across `appointment.meeting.updated` events but may change if SavvyCal rotates the underlying token, and always changes when the meeting is replaced. Consumers caching `host_url` should listen for both `appointment.meeting.updated` and `appointment.meeting.replaced` to keep stored copies fresh. Types and runtime behavior are unchanged; only the schema description was updated.

## 1.7.0

### Minor Changes

- [`84292f6`](https://github.com/svycal/appointments/commit/84292f643038f8f590430d338602d66167e9d0c4) Thanks [@derrickreimer](https://github.com/derrickreimer)! - **New: AppointmentMeeting host_url** -- AppointmentMeeting now includes a stable `host_url` proxy URL the meeting host follows to start the meeting. Treat as a credential — anyone with this URL can start the meeting as host. Valid through the appointment's end time + 24h grace window. See https://developers.savvycal.app/api/schemas/appointmentmeeting.

- [`84292f6`](https://github.com/svycal/appointments/commit/84292f643038f8f590430d338602d66167e9d0c4) Thanks [@derrickreimer](https://github.com/derrickreimer)! - **New: client_data fields** -- The `client_data` object on Appointment and BookingIntent responses now includes a `fields` map containing custom client field values, keyed by field slug. Values for fields flagged as sensitive are redacted unless `include_sensitive` is `true`. See https://developers.savvycal.app/api/schemas/appointment and https://developers.savvycal.app/api/schemas/bookingintent.

### Patch Changes

- [#26](https://github.com/svycal/appointments/pull/26) [`02aeff4`](https://github.com/svycal/appointments/commit/02aeff4b6ba75d51a1fd96ef15ad2061a2abbe6e) Thanks [@derrickreimer](https://github.com/derrickreimer)! - **Internal:** -- Bumped dev dependencies and added pnpm overrides to resolve Dependabot security advisories across the monorepo. No public API changes.

- [`84292f6`](https://github.com/svycal/appointments/commit/84292f643038f8f590430d338602d66167e9d0c4) Thanks [@derrickreimer](https://github.com/derrickreimer)! - **Changed: client_data input schemas** -- The `client_data` input on appointment and booking intent endpoints is now exposed as named, reusable schemas: AppointmentClientDataInput (appointment creates) and ClientDataInput (booking intent create/update). Shapes are unchanged; the `fields` description has been tightened to clarify that each key must correspond to a Client Field defined in the account. See https://developers.savvycal.app/api/schemas/appointmentclientdatainput and https://developers.savvycal.app/api/schemas/clientdatainput.

## 1.6.0

### Minor Changes

- [`3318880`](https://github.com/svycal/appointments/commit/3318880f66187e12c6e17cee1f60c7d5c3da16ec) Thanks [@derrickreimer](https://github.com/derrickreimer)! - **New:** -- [Appointment](https://developers.savvycal.app/api/schemas/appointment) and [PublicAppointment](https://developers.savvycal.app/api/schemas/publicappointment) now expose individual top-level URL fields. [Appointment](https://developers.savvycal.app/api/schemas/appointment) exposes `add_to_calendar_url`, `cancel_url`, `confirm_url`, `ics_url`, `join_url`, and `reschedule_url`. [PublicAppointment](https://developers.savvycal.app/api/schemas/publicappointment) exposes `add_to_calendar_url`, `cancel_url`, `ics_url`, and `reschedule_url`. Each is a single canonical URL string that resolves to the account's active custom domain when configured. There is no top-level replacement for `urls.add_to_google_calendar`; use `add_to_calendar_url` instead.

### Patch Changes

- [`3318880`](https://github.com/svycal/appointments/commit/3318880f66187e12c6e17cee1f60c7d5c3da16ec) Thanks [@derrickreimer](https://github.com/derrickreimer)! - **Deprecated:** -- The `urls` object on [Appointment](https://developers.savvycal.app/api/schemas/appointment) and [PublicAppointment](https://developers.savvycal.app/api/schemas/publicappointment) is deprecated in favor of the new top-level URL fields and will be removed in a future release.

## 1.5.0

### Minor Changes

- [`eecabad`](https://github.com/svycal/appointments/commit/eecabade9171cb544138bb323a46182c63c49a9b) Thanks [@derrickreimer](https://github.com/derrickreimer)! - **Changed:** -- The `PublicServiceSlotsResponse` schema has been renamed to [SlotListResponse](https://developers.savvycal.app/api/schemas/slotlistresponse) and is now used by both authenticated and public slot listing endpoints. The response shape is unchanged.

- [`eecabad`](https://github.com/svycal/appointments/commit/eecabade9171cb544138bb323a46182c63c49a9b) Thanks [@derrickreimer](https://github.com/derrickreimer)! - **New:** -- Booking intents now support secondary providers via a `secondary_providers` field on [CreateBookingIntentRequest](https://developers.savvycal.app/api/schemas/createbookingintentrequest), [UpdateBookingIntentRequest](https://developers.savvycal.app/api/schemas/updatebookingintentrequest), and [BookingIntent](https://developers.savvycal.app/api/schemas/bookingintent).

- [`eecabad`](https://github.com/svycal/appointments/commit/eecabade9171cb544138bb323a46182c63c49a9b) Thanks [@derrickreimer](https://github.com/derrickreimer)! - **New:** -- [Dashboard sessions](https://developers.savvycal.app/api/schemas/dashboardsession) now support an `idle_timeout_minutes` field for configuring the inactivity period before re-authentication is required. See [Create Dashboard Session](https://developers.savvycal.app/api/create-dashboard-session).

- [`eecabad`](https://github.com/svycal/appointments/commit/eecabade9171cb544138bb323a46182c63c49a9b) Thanks [@derrickreimer](https://github.com/derrickreimer)! - **New:** -- [Appointment](https://developers.savvycal.app/api/schemas/appointment) responses now include a `meeting` field with conferencing details (provider, join URL, password, etc.) and an asynchronous lifecycle status. See [AppointmentMeeting](https://developers.savvycal.app/api/schemas/appointmentmeeting).

- [`eecabad`](https://github.com/svycal/appointments/commit/eecabade9171cb544138bb323a46182c63c49a9b) Thanks [@derrickreimer](https://github.com/derrickreimer)! - **Changed:** -- The `source` field on [ConfirmationEvent](https://developers.savvycal.app/api/schemas/confirmationevent) and [RescheduleEvent](https://developers.savvycal.app/api/schemas/rescheduleevent) now includes a `public_api` value to distinguish events initiated through the public API.

- [`eecabad`](https://github.com/svycal/appointments/commit/eecabade9171cb544138bb323a46182c63c49a9b) Thanks [@derrickreimer](https://github.com/derrickreimer)! - **New:** -- Added webhook events for the appointment meeting lifecycle: `appointment.meeting.created`, `appointment.meeting.updated`, `appointment.meeting.canceled`, and `appointment.meeting.replaced`, plus terminal-failure events `appointment.meeting.create_failed`, `appointment.meeting.update_failed`, `appointment.meeting.cancel_failed`, and `appointment.meeting.replace_failed`. See [AppointmentMeetingCreatedEventData](https://developers.savvycal.app/api/schemas/appointmentmeetingcreatedeventdata), [AppointmentMeetingUpdatedEventData](https://developers.savvycal.app/api/schemas/appointmentmeetingupdatedeventdata), [AppointmentMeetingCanceledEventData](https://developers.savvycal.app/api/schemas/appointmentmeetingcanceledeventdata), [AppointmentMeetingReplacedEventData](https://developers.savvycal.app/api/schemas/appointmentmeetingreplacedeventdata), [AppointmentMeetingCreateFailedEventData](https://developers.savvycal.app/api/schemas/appointmentmeetingcreatefailedeventdata), [AppointmentMeetingUpdateFailedEventData](https://developers.savvycal.app/api/schemas/appointmentmeetingupdatefailedeventdata), [AppointmentMeetingCancelFailedEventData](https://developers.savvycal.app/api/schemas/appointmentmeetingcancelfailedeventdata), and [AppointmentMeetingReplaceFailedEventData](https://developers.savvycal.app/api/schemas/appointmentmeetingreplacefailedeventdata).

- [`eecabad`](https://github.com/svycal/appointments/commit/eecabade9171cb544138bb323a46182c63c49a9b) Thanks [@derrickreimer](https://github.com/derrickreimer)! - **New:** -- Added two endpoints for listing time slots based on a booking intent's configuration: [List available slots for a booking intent](https://developers.savvycal.app/api/list-booking-intent-slots) (authenticated) and [List available slots for a booking intent](https://developers.savvycal.app/api/list-public-booking-intent-slots) (public). Both return the new [SlotListResponse](https://developers.savvycal.app/api/schemas/slotlistresponse) schema.

- [`eecabad`](https://github.com/svycal/appointments/commit/eecabade9171cb544138bb323a46182c63c49a9b) Thanks [@derrickreimer](https://github.com/derrickreimer)! - **New:** -- [Appointment](https://developers.savvycal.app/api/schemas/appointment) responses now include a `providers` array containing each assigned provider with their role (`primary` or `secondary`). See [AppointmentProvider](https://developers.savvycal.app/api/schemas/appointmentprovider).

## 1.4.0

### Minor Changes

- [`2c26bf1`](https://github.com/svycal/appointments/commit/2c26bf10bfb0805ca1cb27260c4b2e73288e0c20) Thanks [@derrickreimer](https://github.com/derrickreimer)! - **Changed:** -- The `locked_fields` enum values `start_at`, `end_at`, and `time_zone` have been consolidated into a single `slot` value on [BookingIntent](https://developers.savvycal.app/api/schemas/bookingintent), [PublicBookingIntent](https://developers.savvycal.app/api/schemas/publicbookingintent), and related request schemas.

## 1.3.0

### Minor Changes

- [`fbaa453`](https://github.com/svycal/appointments/commit/fbaa4535a5418465814362c25e94d97cc8b0e4a6) Thanks [@derrickreimer](https://github.com/derrickreimer)! - **New:** -- Booking intents now include `requirements` and `workflow` fields. Requirements provides per-section completeness status for booking, info, and form submission steps. Workflow provides server-computed step routing, completability, and defunct state. See [BookingIntentRequirements](https://developers.savvycal.app/api/schemas/bookingintentrequirements), [BookingIntentWorkflow](https://developers.savvycal.app/api/schemas/bookingintentworkflow), and [SubmissionRequirement](https://developers.savvycal.app/api/schemas/submissionrequirement).

### Patch Changes

- [`fbaa453`](https://github.com/svycal/appointments/commit/fbaa4535a5418465814362c25e94d97cc8b0e4a6) Thanks [@derrickreimer](https://github.com/derrickreimer)! - **Changed:** -- The `locked_fields` field on [BookingIntent](https://developers.savvycal.app/api/schemas/bookingintent), [PublicBookingIntent](https://developers.savvycal.app/api/schemas/publicbookingintent), and related request schemas is now a typed enum array instead of a freeform string array.

## 1.2.0

### Minor Changes

- [`475a48e`](https://github.com/svycal/appointments/commit/475a48eca93f51f6b99f6a247ab1710cf17be547) Thanks [@derrickreimer](https://github.com/derrickreimer)! - **Changed: BookingIntent hold fields restructured** -- The `hold_duration` and `hold_enabled` fields on BookingIntent, CreateBookingIntentRequest, and UpdateBookingIntentRequest have been replaced with a nested `booking_policy` object. Hold settings are now at `booking_policy.hold.duration` and `booking_policy.hold.enabled`. See [BookingIntent](https://developers.savvycal.app/api/schemas/bookingintent).

- [`475a48e`](https://github.com/svycal/appointments/commit/475a48eca93f51f6b99f6a247ab1710cf17be547) Thanks [@derrickreimer](https://github.com/derrickreimer)! - **New: BookingIntentBookingPolicy** -- Added a BookingIntentBookingPolicy schema representing hold policy overrides applied to a booking intent. See [BookingIntentBookingPolicy](https://developers.savvycal.app/api/schemas/bookingintentbookingpolicy).

## 1.1.1

### Patch Changes

- [`7d3af56`](https://github.com/svycal/appointments/commit/7d3af5607b515a390ffd6d1a852a69e0a922ad94) Thanks [@derrickreimer](https://github.com/derrickreimer)! - **Changed:** -- Refined BookingIntent and PublicBookingIntent schemas: `errors` field is now nullable (null when not computed), `locked_fields` includes `submissions`, and minor description updates.

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
