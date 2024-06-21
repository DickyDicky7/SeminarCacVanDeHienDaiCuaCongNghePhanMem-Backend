# SeminarCacVanDeHienDaiCuaCongNghePhanMem-Backend

A simple hello world express server. Run it in the terminal with

```
npm run start
```

and cmd+click (or ctrl+click) on "http://localhost:3000" to access the server.

```
https://waseminarcnpm.azurewebsites.net/
```

```
docker-compose up --build
```

```
docker stop $(docker ps -a -q)
```

```
docker tag redis/redis-stack:7.0.6-RC9 rnseminarcnpm.azurecr.io/redis-stack:7.0.6-RC9
docker login rnseminarcnpm.azurecr.io
docker push rnseminarcnpm.azurecr.io/seminarcnpmbackend:latest
docker push rnseminarcnpm.azurecr.io/redis-stack:7.0.6-RC9
```

