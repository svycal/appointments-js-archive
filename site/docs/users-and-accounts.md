---
---

# Users and Accounts

This guide explains the identity and access model in SavvyCal Appointments: how users authenticate, how accounts provide tenancy boundaries, and how these concepts relate to providers and connected calendar accounts.

## Users

A [`User`](/api/schemas/user) represents a person's identity for the purpose of authenticating to the application. Users log in with their email and password and can belong to one or more accounts.

Key properties of a user include:

| Property     | Type   | Description                                                     |
| ------------ | ------ | --------------------------------------------------------------- |
| `id`         | string | The unique identifier for the user (e.g., `user_d025a96ac0c6`). |
| `email`      | string | The user's email address.                                       |
| `first_name` | string | The user's first name.                                          |
| `last_name`  | string | The user's last name.                                           |

See the [User](/api/schemas/user) schema for complete details.

## Accounts

An [`Account`](/api/schemas/account) represents a tenancy boundary, generally an organization or a department within an organization. All resources — providers, services, clients, appointments, and more — belong to an account.

See the [Data Model](/data-model) page for a detailed overview of account-level resources.

## Account membership and roles

Users can belong to one or more accounts and are assigned roles within each account. The [`AccountUser`](/api/schemas/accountuser) object represents this membership.

Key properties of an account user include:

| Property  | Type    | Description                                                                                                               |
| --------- | ------- | ------------------------------------------------------------------------------------------------------------------------- |
| `user`    | object  | The [User](/api/schemas/user) object for this membership.                                                                 |
| `roles`   | array   | The roles assigned to the user in this account (e.g., `admin`, `staff`, `developer`, `custom`).                           |
| `passive` | boolean | Whether this user is passive. Passive users do not receive direct email notifications (e.g., OAuth reconnection notices). |

See the [AccountUser](/api/schemas/accountuser) schema for complete details.

### Relevant API endpoints

- [List account users](/api/list-account-users) — retrieve all users in an account.
- [Create account user](/api/create-account-user) — add a new user to an account.
- [Update account user](/api/update-account-user) — modify a user's roles or passive status.

## Providers and users

[Providers](/data-model#providers) (referred to as "Staff" in the Dashboard UI) represent people who provide services. A provider may or may not be affiliated with a user:

- **Provider without a user** — for staff whose schedules are fully managed by admins and who never need to log in.
- **User without a provider** — for administrative team members who manage the account but don't provide services themselves.

When creating resources via the API, you can link these together:

- The [Create provider](/api/create-provider) API has an `add_user` option to create (or affiliate) a user for the provider.
- The [Create account user](/api/create-account-user) API has an `add_provider` option to create (or affiliate) a provider for the user.

## Connected calendar accounts

Connecting external calendar accounts (Google Calendar, Microsoft 365) to a provider enables appointment syncing and availability conflict checking. This requires the provider to be affiliated with a user, because the user logs in and authenticates their calendar accounts via OAuth.

See the [ConnectedAccount](/api/schemas/connectedaccount) schema for complete details.
