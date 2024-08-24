# dumoserv
My attempt at a web server


# .nhtml
.nhtml is a file format deisgned just for this web server.<br />
It's kinda like ASP but using node.<br />
Example:
```html
<body>
    <script usenode>
        dumoserv.write('hello world! ');
        dumoserv.write(dumoserv.req.method);
    </script>
</body>
```
```html
<body>
    hello world! GET
</body>
```

# how to use it
You'll need docker and docker compose.
<br/>On arch linux you can use `sudo pacman -S docker docker-compose`.
<br />
If you want to use it in a production environment, just `sudo docker compose up -d`, but if you wanna use it in a development environment, use `npm run dev` (on the host machine).
<br />
Put files you wanna serve in the www folder.