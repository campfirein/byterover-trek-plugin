# Search and answer

1. Resolve the drive scope. Avoid a list call when the user already supplied drive IDs.
2. Choose `byterover_search` for evidence work or `byterover_answer` for one cited answer.
3. Keep `low`, `medium`, or `high` effort exactly as requested.
4. If search passages lack context, call `byterover_read_document` only for the relevant page, heading, sheet, slide,
   or byte range.
5. Cite the returned source locations. If the result is `not_found`, explain what evidence is missing.

Do not broaden drive scope after an error. A drive error is not permission to search another drive.
