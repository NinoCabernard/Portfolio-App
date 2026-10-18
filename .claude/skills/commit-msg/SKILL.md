---
name: commit-msg
description: Commit staged changes with a single precise one-line message. Use when the user asks to commit or for a commit message.
---

# Commit message

1. Run `git diff --cached`. If nothing is staged, run `git status` and ask the user what to stage.
2. Write one line describing what was done:
   - Imperative mood, e.g. `Fix root type import path`
   - Max ~60 characters, no trailing period
   - Only what changed; no reasons, no lists, no filler words
3. No body. No `Co-Authored-By` or any other attribution line.
4. Commit with `git commit -m "<message>"` and show the resulting one-line log entry.
