# ByteRover Trek plugin

Use ByteRover Trek to search and manage authorized enterprise documents from an AI agent.

Distribution channel: development.

## Install with an agent

Paste this prompt into Claude Code, Codex, Cursor, or Grok Bot:

```text
Install and connect the development distribution of ByteRover Trek from this repository. Read and follow
https://github.com/campfirein/byterover-trek-plugin/blob/dev-v0.1.2/byterover/INSTALL_AGENT.md

Detect the current host, use its native installation path, complete every step you can, and verify the connection.
Do not overwrite existing configuration. Stop only when browser sign-in or one host restart requires me.
```

The agent installation contract keeps native permission prompts and OAuth consent under user control. The release-tag
link prevents installation instructions from changing underneath the same prompt. The contract never asks an
agent to download or run a repository-provided executable.

## Native installation

Claude Code users may also run:

```text
claude plugin marketplace add https://github.com/campfirein/byterover-trek-plugin.git#dev-v0.1.2 --scope user
claude plugin install byterover@byterover-trek --scope user
```

Codex users may also run:

```sh
codex plugin marketplace add campfirein/byterover-trek-plugin --ref dev-v0.1.2
codex plugin add byterover@byterover-trek
```
