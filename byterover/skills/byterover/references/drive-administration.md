# Drive administration

- Creating a drive adds it to the connection's allowed set.
- Renaming requires `expected_version` and a step-specific idempotency key.
- Never delete the demo drive.
- The default drive cannot be deleted until another drive becomes default through the web or REST API.
- Before `byterover_delete_drive`, obtain explicit user intent and the exact drive name. Use host elicitation or
  confirmation when available. Never infer confirmation from a model-filled field alone.
