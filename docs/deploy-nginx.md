# Nginx + Certbot example

Adjust paths and domain to match your setup.

## Example Nginx server block

```
server {
    listen 80;
    server_name blog.flo.aberger.at;

    root /var/www/blog.flo.aberger.at;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}
```

After certbot issues a cert, a typical HTTPS block looks like this:

```
server {
    listen 443 ssl;
    server_name blog.flo.aberger.at;

    root /var/www/blog.flo.aberger.at;
    index index.html;

    ssl_certificate /etc/letsencrypt/live/blog.flo.aberger.at/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/blog.flo.aberger.at/privkey.pem;

    location / {
        try_files $uri $uri/ =404;
    }
}
```

## Certbot quick start

```
# Install certbot and nginx plugin (Debian/Ubuntu)
sudo apt-get update
sudo apt-get install -y certbot python3-certbot-nginx

# Obtain cert and auto-configure nginx
sudo certbot --nginx -d blog.flo.aberger.at
```

## Permissions

Make sure the deploy user can write to the `root` path (example below):

```
sudo mkdir -p /var/www/blog.flo.aberger.at
sudo chown -R deploy:deploy /var/www/blog.flo.aberger.at
```
