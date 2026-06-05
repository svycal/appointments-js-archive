# @savvycal/appointments-react-query

## 1.2.8

### Patch Changes

- Updated dependencies [[`10fc79c`](https://github.com/svycal/appointments/commit/10fc79cc755420c652cb9f4dc861e24b29cdde22), [`10fc79c`](https://github.com/svycal/appointments/commit/10fc79cc755420c652cb9f4dc861e24b29cdde22)]:
  - @savvycal/appointments-core@1.9.0

## 1.2.7

### Patch Changes

- Updated dependencies [[`ccbedce`](https://github.com/svycal/appointments/commit/ccbedce0ccefbfd74ab16329aa186598076a79b1), [`a3a3255`](https://github.com/svycal/appointments/commit/a3a32554e8969364ca0154e0c265c6de591608fe), [`a3a3255`](https://github.com/svycal/appointments/commit/a3a32554e8969364ca0154e0c265c6de591608fe)]:
  - @savvycal/appointments-core@1.8.0

## 1.2.6

### Patch Changes

- Updated dependencies [[`dd2fdd6`](https://github.com/svycal/appointments/commit/dd2fdd6876ed23cf29918adeca68ac6f6af39660)]:
  - @savvycal/appointments-core@1.7.1

## 1.2.5

### Patch Changes

- [#26](https://github.com/svycal/appointments/pull/26) [`02aeff4`](https://github.com/svycal/appointments/commit/02aeff4b6ba75d51a1fd96ef15ad2061a2abbe6e) Thanks [@derrickreimer](https://github.com/derrickreimer)! - **Internal:** -- Bumped dev dependencies and added pnpm overrides to resolve Dependabot security advisories across the monorepo. No public API changes.

- Updated dependencies [[`84292f6`](https://github.com/svycal/appointments/commit/84292f643038f8f590430d338602d66167e9d0c4), [`02aeff4`](https://github.com/svycal/appointments/commit/02aeff4b6ba75d51a1fd96ef15ad2061a2abbe6e), [`84292f6`](https://github.com/svycal/appointments/commit/84292f643038f8f590430d338602d66167e9d0c4), [`84292f6`](https://github.com/svycal/appointments/commit/84292f643038f8f590430d338602d66167e9d0c4)]:
  - @savvycal/appointments-core@1.7.0

## 1.2.4

### Patch Changes

- Updated dependencies [[`3318880`](https://github.com/svycal/appointments/commit/3318880f66187e12c6e17cee1f60c7d5c3da16ec), [`3318880`](https://github.com/svycal/appointments/commit/3318880f66187e12c6e17cee1f60c7d5c3da16ec)]:
  - @savvycal/appointments-core@1.6.0

## 1.2.3

### Patch Changes

- Updated dependencies [[`eecabad`](https://github.com/svycal/appointments/commit/eecabade9171cb544138bb323a46182c63c49a9b), [`eecabad`](https://github.com/svycal/appointments/commit/eecabade9171cb544138bb323a46182c63c49a9b), [`eecabad`](https://github.com/svycal/appointments/commit/eecabade9171cb544138bb323a46182c63c49a9b), [`eecabad`](https://github.com/svycal/appointments/commit/eecabade9171cb544138bb323a46182c63c49a9b), [`eecabad`](https://github.com/svycal/appointments/commit/eecabade9171cb544138bb323a46182c63c49a9b), [`eecabad`](https://github.com/svycal/appointments/commit/eecabade9171cb544138bb323a46182c63c49a9b), [`eecabad`](https://github.com/svycal/appointments/commit/eecabade9171cb544138bb323a46182c63c49a9b), [`eecabad`](https://github.com/svycal/appointments/commit/eecabade9171cb544138bb323a46182c63c49a9b)]:
  - @savvycal/appointments-core@1.5.0

## 1.2.2

### Patch Changes

- Updated dependencies [[`2c26bf1`](https://github.com/svycal/appointments/commit/2c26bf10bfb0805ca1cb27260c4b2e73288e0c20)]:
  - @savvycal/appointments-core@1.4.0

## 1.2.1

### Patch Changes

- Updated dependencies [[`fbaa453`](https://github.com/svycal/appointments/commit/fbaa4535a5418465814362c25e94d97cc8b0e4a6), [`fbaa453`](https://github.com/svycal/appointments/commit/fbaa4535a5418465814362c25e94d97cc8b0e4a6)]:
  - @savvycal/appointments-core@1.3.0

## 1.2.0

### Minor Changes

- [`475a48e`](https://github.com/svycal/appointments/commit/475a48eca93f51f6b99f6a247ab1710cf17be547) Thanks [@derrickreimer](https://github.com/derrickreimer)! - **Changed: BookingIntent hold fields restructured** -- The `hold_duration` and `hold_enabled` fields on BookingIntent, CreateBookingIntentRequest, and UpdateBookingIntentRequest have been replaced with a nested `booking_policy` object. Hold settings are now at `booking_policy.hold.duration` and `booking_policy.hold.enabled`. See [BookingIntent](https://developers.savvycal.app/api/schemas/bookingintent).

### Patch Changes

- Updated dependencies [[`475a48e`](https://github.com/svycal/appointments/commit/475a48eca93f51f6b99f6a247ab1710cf17be547), [`475a48e`](https://github.com/svycal/appointments/commit/475a48eca93f51f6b99f6a247ab1710cf17be547)]:
  - @savvycal/appointments-core@1.2.0

## 1.1.1

### Patch Changes

- Updated dependencies [[`7d3af56`](https://github.com/svycal/appointments/commit/7d3af5607b515a390ffd6d1a852a69e0a922ad94)]:
  - @savvycal/appointments-core@1.1.1

## 1.1.0

### Minor Changes

- [`c97027d`](https://github.com/svycal/appointments/commit/c97027dfbc89af12f95b5a8cfcd61c903c4f7ac4) Thanks [@derrickreimer](https://github.com/derrickreimer)! - **New:** -- Booking intents now include an `errors` field containing validation errors in JSON:API format. See [BookingIntent](https://developers.savvycal.app/api/schemas/bookingintent) and [JsonError](https://developers.savvycal.app/api/schemas/jsonerror).

### Patch Changes

- Updated dependencies [[`c97027d`](https://github.com/svycal/appointments/commit/c97027dfbc89af12f95b5a8cfcd61c903c4f7ac4), [`c97027d`](https://github.com/svycal/appointments/commit/c97027dfbc89af12f95b5a8cfcd61c903c4f7ac4)]:
  - @savvycal/appointments-core@1.1.0

## 1.0.0

### Major Changes

- [`1f5086d`](https://github.com/svycal/appointments/commit/1f5086ddb4fbd3bc12761a2af2a4bd2d1d432e61) Thanks [@derrickreimer](https://github.com/derrickreimer)! - **Removed:** -- The deprecated `client_locale`, `client_reference_id`, `client_time_zone`, and `fields` properties have been removed from the [Appointment](https://developers.savvycal.app/api/schemas/appointment) schema. Use `client_data` instead.

### Minor Changes

- [`25cc645`](https://github.com/svycal/appointments/commit/25cc64504aa421ee2165cc7a1d5b611739c1a2d8) Thanks [@derrickreimer](https://github.com/derrickreimer)! - **New:** -- Booking intents now include a `submissions` field for attaching form responses during the booking flow. See [BookingIntent](https://developers.savvycal.app/api/schemas/bookingintent) and [IntentSubmissionInput](https://developers.savvycal.app/api/schemas/intentsubmissioninput).

- [`25cc645`](https://github.com/svycal/appointments/commit/25cc64504aa421ee2165cc7a1d5b611739c1a2d8) Thanks [@derrickreimer](https://github.com/derrickreimer)! - **New:** -- Added React Query hooks for Forms, Client Fields, and Service Forms operations.

### Patch Changes

- Updated dependencies [[`1f5086d`](https://github.com/svycal/appointments/commit/1f5086ddb4fbd3bc12761a2af2a4bd2d1d432e61), [`bcce16e`](https://github.com/svycal/appointments/commit/bcce16e6ce85e3ccf6702a0d4f4005f9f0b28116), [`bcce16e`](https://github.com/svycal/appointments/commit/bcce16e6ce85e3ccf6702a0d4f4005f9f0b28116), [`bcce16e`](https://github.com/svycal/appointments/commit/bcce16e6ce85e3ccf6702a0d4f4005f9f0b28116), [`bcce16e`](https://github.com/svycal/appointments/commit/bcce16e6ce85e3ccf6702a0d4f4005f9f0b28116), [`25cc645`](https://github.com/svycal/appointments/commit/25cc64504aa421ee2165cc7a1d5b611739c1a2d8), [`25cc645`](https://github.com/svycal/appointments/commit/25cc64504aa421ee2165cc7a1d5b611739c1a2d8)]:
  - @savvycal/appointments-core@1.0.0

## 0.4.0

### Minor Changes

- [`6f2d384`](https://github.com/svycal/appointments/commit/6f2d38429915945123e213702cbc85b28823e081) Thanks [@derrickreimer](https://github.com/derrickreimer)! - **New: Metadata** -- Clients and services now support a `metadata` field for storing custom key-value pairs (maximum 16 KB). See [Client](https://developers.savvycal.app/api/schemas/client) and [Service](https://developers.savvycal.app/api/schemas/service).

- [`6f2d384`](https://github.com/svycal/appointments/commit/6f2d38429915945123e213702cbc85b28823e081) Thanks [@derrickreimer](https://github.com/derrickreimer)! - **New: ForbiddenResponse** -- Added a [ForbiddenResponse](https://developers.savvycal.app/api/schemas/forbiddenresponse) schema and 403 status code to the [List Appointments](https://developers.savvycal.app/api/list-appointments) endpoint.

- [`6f2d384`](https://github.com/svycal/appointments/commit/6f2d38429915945123e213702cbc85b28823e081) Thanks [@derrickreimer](https://github.com/derrickreimer)! - **New: Metadata Filtering** -- The [List Clients](https://developers.savvycal.app/api/list-clients) and [List Services](https://developers.savvycal.app/api/list-services) endpoints now support filtering by `metadata` using bracket notation.

### Patch Changes

- Updated dependencies [[`6f2d384`](https://github.com/svycal/appointments/commit/6f2d38429915945123e213702cbc85b28823e081), [`6f2d384`](https://github.com/svycal/appointments/commit/6f2d38429915945123e213702cbc85b28823e081), [`6f2d384`](https://github.com/svycal/appointments/commit/6f2d38429915945123e213702cbc85b28823e081)]:
  - @savvycal/appointments-core@0.14.0

## 0.3.5

### Patch Changes

- Updated dependencies [[`c6d6e59`](https://github.com/svycal/appointments/commit/c6d6e598c93688cef5a436d95af9f536c8cc5b8e)]:
  - @savvycal/appointments-core@0.13.0

## 0.3.4

### Patch Changes

- Updated dependencies [[`00e1891`](https://github.com/svycal/appointments/commit/00e18913091a8109d9604b985b11df1d5219ba4c)]:
  - @savvycal/appointments-core@0.12.0

## 0.3.3

### Patch Changes

- Updated dependencies [[`72045cd`](https://github.com/svycal/appointments/commit/72045cd8d7bb770f5b8c5f20262d86a6f4aec808)]:
  - @savvycal/appointments-core@0.11.0

## 0.3.2

### Patch Changes

- Updated dependencies [[`3bac651`](https://github.com/svycal/appointments/commit/3bac6511150190728ff9d92280f5b55b46e167e7)]:
  - @savvycal/appointments-core@0.10.0

## 0.3.1

### Patch Changes

- Updated dependencies [[`8bac62c`](https://github.com/svycal/appointments/commit/8bac62cb03f0609482624ed98cce9f2264a6e43f), [`8bac62c`](https://github.com/svycal/appointments/commit/8bac62cb03f0609482624ed98cce9f2264a6e43f)]:
  - @savvycal/appointments-core@0.9.0

## 0.3.0

### Minor Changes

- [`2e0d0b0`](https://github.com/svycal/appointments/commit/2e0d0b0c361fec79239f405d057b2bc5debb8913) Thanks [@derrickreimer](https://github.com/derrickreimer)! - - **New: Booking Intents** -- Added 6 authenticated endpoints under `/v1/booking_intents` and 5 public endpoints under `/v1/public/booking_intents` for managing multi-step booking flows with time slot holding. See [Booking Intents](https://developers.savvycal.app/api/create-booking-intent) and [Public Booking Intents](https://developers.savvycal.app/api/create-public-booking-intent).
  - **New: Hold Policy** -- Services now include a `hold` field within `booking_policy` for configuring time slot holds during the booking flow. See [HoldPolicy](https://developers.savvycal.app/api/schemas/holdpolicy) and [BookingPolicy](https://developers.savvycal.app/api/schemas/bookingpolicy).
  - **New: Booking Intent schemas** -- Added [BookingIntent](https://developers.savvycal.app/api/schemas/bookingintent), [PublicBookingIntent](https://developers.savvycal.app/api/schemas/publicbookingintent), [HoldPolicy](https://developers.savvycal.app/api/schemas/holdpolicy), and related request/response types.

### Patch Changes

- Updated dependencies [[`fee8ef7`](https://github.com/svycal/appointments/commit/fee8ef7f95e3d7b169ebb8be29c47070190032e9), [`fee8ef7`](https://github.com/svycal/appointments/commit/fee8ef7f95e3d7b169ebb8be29c47070190032e9), [`2e0d0b0`](https://github.com/svycal/appointments/commit/2e0d0b0c361fec79239f405d057b2bc5debb8913)]:
  - @savvycal/appointments-core@0.8.0

## 0.2.3

### Patch Changes

- Updated dependencies [[`8f5493c`](https://github.com/svycal/appointments/commit/8f5493cacf7c38468def077222e707b7f0b091b0)]:
  - @savvycal/appointments-core@0.7.0

## 0.2.2

### Patch Changes

- Updated dependencies [[`db01ba0`](https://github.com/svycal/appointments/commit/db01ba026150e03550e4ecd6d3b2d989ab63d9db)]:
  - @savvycal/appointments-core@0.6.0

## 0.2.1

### Patch Changes

- Updated dependencies [[`5d3a2f7`](https://github.com/svycal/appointments/commit/5d3a2f72a67c0d410df6203afedc4c852f65d1c3)]:
  - @savvycal/appointments-core@0.5.0

## 0.2.0

### Minor Changes

- [`492c6a6`](https://github.com/svycal/appointments/commit/492c6a6186812528b0c281b2a05bd37e6432d6e5) Thanks [@derrickreimer](https://github.com/derrickreimer)! - Support for Connected Accounts API

### Patch Changes

- Updated dependencies [[`492c6a6`](https://github.com/svycal/appointments/commit/492c6a6186812528b0c281b2a05bd37e6432d6e5)]:
  - @savvycal/appointments-core@0.4.0

## 0.1.2

### Patch Changes

- Updated dependencies [[`088fcfa`](https://github.com/svycal/appointments/commit/088fcfa9c258fcc3c23b372f389c798830125555)]:
  - @savvycal/appointments-core@0.3.0

## 0.1.1

### Patch Changes

- Updated dependencies [[`d7de927`](https://github.com/svycal/appointments/commit/d7de92704307917c35190e687edb82a64613e0a1)]:
  - @savvycal/appointments-core@0.2.0
