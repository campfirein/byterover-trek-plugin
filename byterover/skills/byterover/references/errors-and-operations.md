# Errors and operations

- `unauthenticated`: let the host start OAuth again.
- `forbidden`: do not widen scope or try another drive.
- `conflict`: refresh the current version. For `idempotency_mismatch`, generate a new key only for a genuinely new
  step or payload.
- `rate_limited`: wait for `retry_after_ms` when present.
- `drive_unavailable`, `model_unavailable`, or `timeout`: report the temporary failure. Do not change effort.
- `not_found`: report the missing resource or evidence without invention.

For an operation, poll `byterover_get_operation` only after receiving `operation_id`. Respect `retry_after_ms`. Stop
on `done` or `failed`. Check every per-file result before claiming that uploaded content is searchable.
