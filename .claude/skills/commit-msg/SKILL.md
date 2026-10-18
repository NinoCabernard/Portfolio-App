---
name: commit-msg
description: Commit staged changes (or all changes if nothing is staged) with a single precise one-line message. Use when the user asks to commit or for a commit message.
---

# Commit message

1. Run `git diff --cached`. If changes are staged, commit only those. If nothing is staged, stage all changes with `git add -A` and commit them. Don't ask.
2. Write one line describing what was done:
   - Imperative mood, e.g. `Fix root type import path`
   - Max ~60 characters, no trailing period
   - Only what changed; no reasons, no lists, no filler words
3. No body. No `Co-Authored-By` or any other attribution line.
4. Commit with `git commit -m "<message>"` and show the resulting one-line log entry.
