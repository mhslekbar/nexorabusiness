# nexorabusiness

# TO INSTALL THIS APP ON VPS SERVER 
`

  1 - git clone https://github.com/mhslekbar/nexorabusiness.git
  2 - install all dependency
    => in backend
    1 / apt install nodejs
    2 / npm install -g ts-node
    3 / npm i 
    tsc => to convert ts to js
    4 / pm2 start --name nexorabusiness app.js
    5 / pm2 startup ubuntu
    6 / pm2 status

  <!-- 3 - nano /etc/nginx/sites-available/onmdm -->
  3 - nano /etc/nginx/sites-available/nexorabusiness
    => ln -s /etc/nginx/sites-available/nexorabusiness /etc/nginx/sites-enabled/nexorabusiness
    => 
    server {
      listen 98;
      server_name nexorabusiness.mr www.nexorabusiness.mr;
      location / {
        root /var/www/nexorabusiness/client;
        index  index.html index.htm;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        try_files $uri $uri/ /index.html;
      }
  }

  server {
    listen 98;
    server_name api.nexorabusiness.mr;
    location /api {
      proxy_pass http://46.202.132.36:3033;
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection 'upgrade';
      proxy_set_header Host $host;
      proxy_cache_bypass $http_upgrade;
    }
  }
  
  
  # install ssl
  - apt install certbot python3-certbot-nginx
  - ufw status
  - certbot --nginx -d nexorabusiness.mr -d www.nexorabusiness.mr -d api.nexorabusiness.mr
  <!-- - certbot --nginx -d cdghazaly.com -d www.cdghazaly.com -d api.cdghazaly.com -->
  <!-- - certbot --nginx -d cabinetibtissama.com -d www.cabinetibtissama.com -d api.cabinetibtissama.com -->
  - systemctl status certbot.timer

  <!-- Start to update your project  -->
  - git pull origin master
  <!-- End to update your project  -->

  ##### START to do this for best one
  <!-- mkdir /var/www/nexorabusiness -->
  <!-- mkdir /var/www/nexorabusiness/client -->
  <!-- rm -rf /var/www/cdghazaly/* && mkdir /var/www/cdghazaly/client && cp -r build/* /var/www/cdghazaly/client -->
  <!-- rm -rf /var/www/cabinetibtissama/* && mkdir /var/www/cabinetibtissama/client && cp -r build/* /var/www/cabinetibtissama/client -->
  rm -rf /var/www/nexorabusiness/* && mkdir /var/www/nexorabusiness/client && cp -r build/* /var/www/nexorabusiness/client
  
  ##### END to do this for best one
  ```

  ```
  restart the server
    - ps aux | grep node
    - kill -9 <PID>
    - sudo systemctl reload nginx
  ```

`
<!-- run app npx tsx app.ts -->

<!-- "start": "ts-node ./app.ts", -->

<!-- "start": "nodemon ./app.js", -->  this is true

```
  to kill a port
  pm2 delete => "the server name"
  sudo lsof -i :3021
  kill -9 PID
  systemctl restart nginx
```
<!--  -->



<!-- for Typescript app   -->
--- tsc 
  