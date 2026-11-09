# ByteRover Trek plugin

Development distribution of the ByteRover Trek search plugin for AI agents.

This repository is separate from `campfirein/byterover-plugin`, which remains the
distribution repository for ByteRover Company Brain.

## Development endpoints

- MCP server: `https://dev-mcp.byterover.ai/mcp`
- OAuth server: `https://dev.byterover.ai`

The development server requires OAuth. The host opens the sign-in and consent flow
when the plugin first calls ByteRover.

## Install with an agent

Paste this prompt into Claude Code, Codex, Cursor, or Grok Bot:

```text
Install and connect the development distribution of ByteRover Trek. Read and follow
https://github.com/campfirein/byterover-trek-plugin/blob/dev-v0.1.2/byterover/INSTALL_AGENT.md

Detect the current host, use its native installation path, complete every step you can, and verify the connection.
Do not overwrite existing configuration. Stop only when browser sign-in or one host restart requires me.
```

The release link works after maintainers publish the protected `dev-v0.1.2` tag.

## Install in Codex

Add this repository as a marketplace:

```sh
codex plugin marketplace add campfirein/byterover-trek-plugin --ref dev-v0.1.2
codex plugin add byterover@byterover-trek
```

Complete OAuth when Codex opens the browser, then verify `byterover_list_drives`.

## Install in Claude Code

```sh
claude plugin marketplace add https://github.com/campfirein/byterover-trek-plugin.git#dev-v0.1.2 --scope user
claude plugin install byterover@byterover-trek --scope user
```

## Install in Cursor

Follow [`byterover/INSTALL_AGENT.md`](byterover/INSTALL_AGENT.md). It merges only the
ByteRover server entry, preserves other servers, and stops on local rule changes.

## Install in Grok Bot

Add `https://dev-mcp.byterover.ai/mcp` as a custom remote MCP server named
`byterover`, then complete OAuth. Grok Bot receives MCP tools but not the host skill.

## Repository boundary

This repository contains generated distribution files only. The private Trek
monorepo owns the source plugin, skill, generator, and tests. `SOURCE.json` records
the source commit used for this development package.

Do not edit generated files here. Change the Trek source, rebuild the package, and
publish the generated output through a pull request.
