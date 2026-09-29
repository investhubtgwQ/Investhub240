---
name: Portable npm lockfiles
description: Replit's package proxy can write internal tarball URLs into npm lockfiles used by external deployment providers.
---

When an npm lockfile is generated inside Replit and will be consumed by an external deployment provider, verify that its `resolved` URLs point to a public registry rather than the workspace package proxy.

**Why:** The workspace package proxy can rewrite tarball URLs even when npm is invoked with a public registry override; those internal hosts are not reachable from external builders.

**How to apply:** Keep the project npm registry explicit, inspect the generated lockfile for internal proxy hosts, and normalize only the generated `resolved` URL prefix to the equivalent public npm registry URL before external deployment.