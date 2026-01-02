# Flo Cyber Notes

A lightweight Hugo site for structured cyber security labs, CTFs, and project notes.

## Local development

```bash
hugo server -D
```

## Create new entries

```bash
hugo new labs/htb-lame/index.md
hugo new ctf/forensics-001/index.md
hugo new projects/home-lab-automation/index.md
```

## Pentest notes workflow

Notes live under `content/pentest-notes/` and use page bundles (a folder with an `index.md`).

Add a new note:
```bash
hugo new pentest-notes/recon/dns-enum/index.md
```

Create a new subsection (folder) by adding an `_index.md` in that directory:
```
content/pentest-notes/recon/_index.md
```

Recommended front matter for notes:
```yaml
title: "DNS Enumeration"
summary: "Common DNS enumeration commands and checks."
tags: ["recon", "dns"]
```

Command lists render best as tables:
```markdown
| Command | Description |
| --- | --- |
| `dig axfr <domain> @<ns>` | Attempt zone transfer. |
```

Ordering and navigation:
- Use `weight` in section `_index.md` files to control sidebar order.
- If you rename or move a note, add `aliases` in front matter to keep old links working.

Search:
- Search indexing is automatic on build; no extra steps.

## Screenshots

Use page bundles so each entry can keep images locally:

```
content/labs/htb-lame/index.md
content/labs/htb-lame/nmap.png
```

Then reference the image in markdown:

```
![Nmap scan](nmap.png)
```

## Deploy via GitHub Actions

The workflow in `.github/workflows/deploy.yml` builds the site and deploys the `public/` folder to your server using `rsync` over SSH.

Set these GitHub repository secrets:

- `SSH_PRIVATE_KEY` - private key for the deploy user
- `SSH_HOST` - server hostname or IP
- `SSH_USER` - deploy user
- `SSH_PORT` - SSH port (e.g., `22`)
- `SSH_PATH` - destination path (e.g., `/var/www/blog.flo.aberger.at`)

## Nginx + HTTPS

See `docs/deploy-nginx.md` for an example Nginx server block and certbot notes.
