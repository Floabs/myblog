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
