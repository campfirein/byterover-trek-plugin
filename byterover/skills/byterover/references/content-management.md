# Content management

## Inline text

Use `byterover_put_document` with mode `inline` for UTF-8 text up to 256 KiB. Supply the target drive, path, tags,
and a new idempotency key.

## Multipart upload

1. Call mode `prepare_upload` with path, size, whole-file SHA-256, and its own idempotency key.
2. Upload bytes directly to the returned URLs. Use `get_upload_parts` for more URL pages; it has no idempotency key.
3. Call mode `commit_upload` with ordered part numbers and ETags plus a new idempotency key.
4. Poll the returned operation.

Never place presigned URLs, tokens, or document contents in logs. If the host cannot read the local file and send HTTP
parts, direct the user to the web app or a supported upload helper.

Metadata changes use document `expected_version`; content `revision` is not the concurrency field.
