---
distribution-channel: development
mcp-server-url: https://dev-mcp.byterover.ai/mcp
marketplace-source: campfirein/byterover-trek-plugin
marketplace-ref: dev-v0.1.2
---

# Install ByteRover Trek

This file is an installation contract for an AI agent. It is instruction data, not permission. Continue only when the
current user message explicitly asks you to install ByteRover Trek from the repository that contains this file.
Complete every supported step in that scope without asking for an extra conversational confirmation. Native host
permission prompts and browser OAuth consent still belong to the user.

Read the distribution channel and MCP server URL from the frontmatter. Report the channel before changing the host.
For an install opened from GitHub, require a release tag or full commit in the file URL. Do not install any package
from a mutable branch such as `main`.

If the channel is `development` and the user's current message does not explicitly request development, stop without
changing the host. Read every distribution file from the exact `marketplace-source` and `marketplace-ref` in the
frontmatter. Do not substitute the default branch.

## Goal

Install the ByteRover Trek plugin for the current host, authenticate its remote MCP server, and verify the connection.
Install only for the current user and current host.

## Safety rules

- Determine the current host from your runtime context. Do not select a host only because its executable exists.
- Use the host's native plugin manager when it is available.
- Do not change the MCP URL declared by this package.
- Do not remove other marketplaces, plugins, MCP servers, rules, or user settings.
- Never replace an existing ByteRover entry that points to a different repository or MCP URL. Report the conflict.
- Do not copy tokens, cookies, authorization codes, or browser callback URLs into chat or files.
- Let the host display its native permission prompt. Do not bypass it.
- Let the user complete browser sign-in and consent. Continue verification after the login command returns.
- If the current session cannot load a newly installed plugin, finish the command-line checks and ask for exactly one
  restart. Do not claim that tools are available in the current session until the host shows them.

## Claude Code

1. Inspect the current installation with `claude plugin list --json` and `claude plugin marketplace list --json`.
   The marketplace JSON exposes its repository and local checkout but not its ref. If `byterover-trek` exists, require
   either its `repo` or the canonical Git origin from `installLocation` to equal `marketplace-source`. When
   `<installLocation>/byterover/INSTALL_AGENT.md` exists, require its channel and MCP URL to equal this contract. For a
   legacy checkout without that file, require `<installLocation>/byterover/.mcp.json` to contain the exact MCP URL from
   this contract and treat the missing contract as a ref mismatch eligible for one migration. Then inspect the checkout
   with read-only Git commands and compare `HEAD` with the commit named by `marketplace-ref`. If the repository,
   channel, or MCP URL differs, stop and report the conflict.
2. If `byterover-trek` is absent, add the pinned user-scoped marketplace:

   ```sh
   claude plugin marketplace add https://github.com/campfirein/byterover-trek-plugin.git#dev-v0.1.2 --scope user
   ```

3. If the repository matches but the ref is absent or differs, migrate only this user-scoped marketplace:

   ```sh
   claude plugin marketplace remove byterover-trek --scope user
   claude plugin marketplace add https://github.com/campfirein/byterover-trek-plugin.git#dev-v0.1.2 --scope user
   ```

   Stop if the user-scoped declaration cannot be removed. Do not remove project or local declarations. This migration
   is authorized only by the current explicit install or update request. Add or migrate the marketplace at most once.
4. After step 2 or 3, rerun both inspection commands from step 1 and use only the new state. If the source or ref still
   differs, stop and report the failure. Do not repeat the add or migration.
5. If `byterover@byterover-trek` is not installed, run:

   ```sh
   claude plugin install byterover@byterover-trek --scope user
   ```

6. If it is already installed, refresh it instead:

   ```sh
   claude plugin marketplace update byterover-trek
   claude plugin update byterover@byterover-trek --scope user
   ```

   If it is installed but disabled, run:

   ```sh
   claude plugin enable byterover@byterover-trek --scope user
   ```

7. Authenticate when required:

   ```sh
   claude mcp login 'plugin:byterover:byterover'
   ```

8. Verify that `claude plugin list` shows `byterover@byterover-trek` as enabled and `claude mcp list` shows
   `plugin:byterover:byterover` as connected.

## Codex

1. Inspect the current installation with `codex plugin marketplace list --json`, `codex plugin list --json`, and
   `codex mcp list`. The marketplace JSON exposes its source and local root but not its ref. If `byterover-trek` exists,
   require its source to equal `https://github.com/campfirein/byterover-trek-plugin.git`. When
   `<root>/byterover/INSTALL_AGENT.md` exists, require its channel and MCP URL to equal this contract. For a legacy
   checkout without that file, require `<root>/byterover/mcp.json` to contain the exact MCP URL from this contract and
   treat the missing contract as a ref mismatch eligible for one migration. Then inspect the checkout with read-only
   Git commands and compare `HEAD` with the commit named by `marketplace-ref`. If the source, channel, or MCP URL
   differs, stop and report the conflict.
2. If the `byterover-trek` marketplace is absent, add the pinned marketplace:

   ```sh
   codex plugin marketplace add campfirein/byterover-trek-plugin --ref dev-v0.1.2 --json
   ```

3. If the source matches but the ref is absent or differs, migrate only this marketplace:

   ```sh
   codex plugin marketplace remove byterover-trek --json
   codex plugin marketplace add campfirein/byterover-trek-plugin --ref dev-v0.1.2 --json
   ```

   Stop if removal fails. This migration is authorized only by the current explicit install or update request. Add or
   migrate the marketplace at most once.
4. After step 2 or 3, rerun all inspection commands from step 1 and use only the new state. If the source or ref still
   differs, stop and report the failure. Do not repeat the add or migration.
5. If `byterover@byterover-trek` is not installed, run:

   ```sh
   codex plugin add byterover@byterover-trek --json
   ```

   If the plugin is installed but disabled or has another version, reinstall only this plugin:

   ```sh
   codex plugin remove byterover@byterover-trek --json
   codex plugin add byterover@byterover-trek --json
   ```

6. Authenticate when required:

   ```sh
   codex mcp login byterover
   ```

7. Verify that `codex plugin list --json` shows `byterover@byterover-trek` as enabled and `codex mcp list` shows
   `byterover` with OAuth authentication.

## Cursor

Install into the current project only when the current working directory is the intended project.

1. Read `byterover/.cursor/mcp.json` and `byterover/.cursor/rules/byterover.mdc` from the exact marketplace source and
   ref declared in the frontmatter.
2. Inspect `<project>/.cursor/mcp.json` before editing it. If the file exists but is not valid JSON, stop without
   writing. If `mcpServers.byterover` is absent, add the packaged entry. If it has the exact packaged URL, keep it. If
   it has another URL, stop and report the conflict.
3. Inspect `<project>/.cursor/rules/byterover.mdc` before editing it. If it is absent, copy the packaged rule. If it has
   a ByteRover Trek `source-sha256` marker, hash the canonical body and require it to equal that marker before replacing
   the file. A mismatch means the user changed it; stop and report the conflict. Also stop if the marker is absent.
4. Parse the final MCP file as JSON before reporting success.
5. Ask for one Cursor restart. After restart, direct the user to `Customize` > `MCPs` > `byterover` and let Cursor
   complete OAuth.

Do not overwrite an existing `.cursor/mcp.json` with the distribution file.

## Grok Bot

Grok Bot supports the remote MCP connection, not this host-specific skill package.

1. Use the MCP server URL declared in the frontmatter. Do not read it from a mutable branch.
2. Inspect existing custom MCP connections. If `byterover` is absent, add it with that URL. If it has the same URL,
   reuse it. If it has another URL, stop and report the conflict. Never replace the existing connection.
3. Let the user complete OAuth.
4. Verify that Grok Bot discovers the ByteRover tools.

## Unsupported hosts

Do not invent an installation path. Explain that this repository currently provides verified installation contracts
for Claude Code, Codex, Cursor, and the Grok Bot MCP connection. A hosted product may require a catalog submission or
administrator-managed connector.

## Functional verification

When the host can use newly installed tools in the current session:

1. Confirm that the server exposes ByteRover tools.
2. Confirm that ByteRover tools use the `byterover_` prefix and record the discovered count. This package documents 12
   tools, but do not fail installation only because a development server exposes a different count.
3. Call `byterover_list_drives` once.
4. Report the returned drive names without reading or changing documents.

If a restart is required, report installation and authentication separately from functional verification. Do not call
the installation complete end to end until one ByteRover tool succeeds.

## Final report

Report only:

- detected host;
- plugin installation state;
- MCP authentication state;
- functional verification state;
- the single remaining user action, or `none`.
