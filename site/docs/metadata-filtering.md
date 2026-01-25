---
---

# Metadata Filtering

Several API endpoints support filtering by metadata using query parameters with bracket notation.

## Query Format

Filter resources by metadata using bracket notation in query parameters:

- `metadata[key]=value` - equality match (implicit eq operator)
- `metadata[key][operator]=value` - explicit operator

## Operators

| Operator   | Description                                           | Example                              |
| ---------- | ----------------------------------------------------- | ------------------------------------ |
| `eq`       | Exact match (default when no operator specified)      | `metadata[location][eq]=NYC`         |
| `not_eq`   | Not equal (excludes matching resources)               | `metadata[status][not_eq]=inactive`  |
| `in`       | Value is one of comma-delimited values                | `metadata[department][in]=sales,marketing` |
| `contains` | Array metadata value contains the given value         | `metadata[tags][contains]=priority`  |
| `gte`      | Greater than or equal (numeric comparison)            | `metadata[age][gte]=30`              |
| `lte`      | Less than or equal (numeric comparison)               | `metadata[score][lte]=100`           |

## Examples

Filter by exact match:

```http
GET /v1/providers?metadata[location]=NYC
```

Filter by numeric range:

```http
GET /v1/providers?metadata[age][gte]=30&metadata[age][lte]=50
```

Filter by multiple values:

```http
GET /v1/providers?metadata[department][in]=sales,marketing,support
```

Exclude specific values:

```http
GET /v1/providers?metadata[status][not_eq]=inactive
```

Filter array metadata:

```http
GET /v1/providers?metadata[skills][contains]=javascript
```
