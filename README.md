# TO Run IPAY Locally

- Clone the app

```
https://github.com/10xdevian/IPAY.git
```

- After Cloning cd IPAY then RUN

```
npm install
```

- After 2nd Step Create env file in Root like .env.example.txt this
- (if you know and have DOCKER if not then put your DB URL)After Creating .env file put your database url or run docker compose file

```
 docker compose up -d
```

- After all of that migrate the database and generate client

# To migrate and generate prisma client Run this CMD From root file

```
npx prisma migrate dev --schema=packages/db/prisma/schema.prisma
npx prisma generate --schema=packages/db/prisma/schema.prisma
```


[Paytm Artitecture](https://projects.100xdevs.com/tracks/Paytm/paytm17-1)

# 💡 Types (Conventional Commits)

- feat: — new feature
- fix: — bug fix
- chore: — tooling/infra updates
- refactor: — code change that doesn’t fix a bug or add feature
- docs: — documentation changes
- style: — formatting, missing semi colons, etc
- test: — adding or fixing tests


