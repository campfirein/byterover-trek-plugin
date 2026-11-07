# ByteRover Trek plugin

Development distribution of the ByteRover Trek search plugin for AI agents.

This repository is separate from `campfirein/byterover-plugin`, which remains the
distribution repository for ByteRover Company Brain.

## Development endpoints

- MCP server: `https://dev-mcp.byterover.ai/mcp`
- OAuth server: `https://dev.byterover.ai`

The development server requires OAuth. The host opens the sign-in and consent flow
when the plugin first calls ByteRover.

## Install in Codex

Add this repository as a marketplace:

```sh
codex plugin marketplace add campfirein/byterover-trek-plugin
```

Then open the Codex plugin directory, select the `byterover-trek` marketplace, and
install `ByteRover Trek Search`.

## Install in Claude Code

```sh
claude plugin marketplace add campfirein/byterover-trek-plugin
```

Then run this command inside Claude Code:

```text
/plugin install byterover@byterover-trek
```

## Install in Cursor

Copy these generated adapters into the target project:

```sh
mkdir -p .cursor/rules
cp byterover/.cursor/mcp.json .cursor/mcp.json
cp byterover/.cursor/rules/byterover.mdc .cursor/rules/byterover.mdc
```

Restart Cursor. Enable the `byterover` MCP server when Cursor prompts for OAuth.

## Repository boundary

This repository contains generated distribution files only. The private Trek
monorepo owns the source plugin, skill, generator, and tests. `SOURCE.json` records
the source commit used for this development package.

Do not edit generated files here. Change the Trek source, rebuild the package, and
publish the generated output through a pull request.
