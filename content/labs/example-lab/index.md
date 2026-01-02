---
title: "Example Lab: Initial Recon & Exploit"
date: 2025-01-02
summary: "Baseline workflow for recon, foothold, and post-exploitation notes."
tags: ["recon", "web", "priv-esc"]
tools: ["nmap", "gobuster", "linpeas"]
platform: "HackTheBox"
difficulty: "easy"
status: "complete"
---

## Objective
Document the approach and store key artifacts for later reference.

## Quick Facts
- Target: 10.10.10.10
- Entry point: HTTP on port 80
- Priv-esc: misconfigured sudo rule

## Notes
1. Run recon and enumerate open ports.
2. Enumerate web content and identify input vectors.
3. Gain foothold, enumerate, and escalate.

## Screenshot
Drop a screenshot in the same folder as this page and reference it:

```
![Nmap scan](nmap.png)
```

## Takeaways
- Keep recon output in the entry so it stays searchable.
- Record the exact command lines you used.
