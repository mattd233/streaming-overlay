# Streaming Overlay Nuxt3

## Setup

### Installing the dependencies

```
yarn
```

### Setting up the ORM.

The ORM used in this project is `prisma`.

Firstly, run

```
npx prisma generate
```

This will generate prisma client from the `prisma/schema.prisma` file. This will generate all the prisma client models and methods used in `server/db` folder.

Then you need to set up a connection to the database. This is done by creating a `.env` file that contains a variable called `DATABASE_URL`.

Example:

```
DATABASE_URL="DATABASE_URL=postgresql://janedoe:mypassword@localhost:5432/mydb"
```

For more info, check the official `prisma` [documentation](https://www.prisma.io/docs).

If the database is new, you can generate the schema for it with:

```
npx prisma db push
```

## Development

### Running the development server

```
yarn dev
```

### Linting

```
yarn lint
```

This will run eslint and stylelint for this project.

### Build production ready app

```
yarn build
```

### Preview the built app

```
yarn preview
```
