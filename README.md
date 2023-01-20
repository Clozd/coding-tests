# Getting Started
## Installing Dependencies
You can use `npm` or `yarn` for this repo. Newer Macbooks with the M1 chip should use `yarn`.

Install Server Dependencies 
```
yarn install
```
Install Client Dependencies
```
cd client/
yarn install
```

## Start Development Server
To start the server, run the following:
```
yarn run dev
```

# Database
## Technologies
* SQLite
> The SQLite database is stored in a file locally.

## Seeding Database
The repository comes with the database pre-seeded. If you need to reset the database to its original state, run the following:
```
yarn run seed
```

## Running SQL Queries on the Database
This repository uses the `sqlite3` npm package. In `/db`, we already connect to the database file for you. Simply import `/db/index.js` to the file in which you need it and start running queries.

For more information on how to use `sqlite3`, [read the docs here.](https://www.npmjs.com/package/sqlite3)

## Changing the Database Structure
If needed for your coding challenge, you may change the structure of the database. One way you could accomplish this is by:

1. Deleting the file `/db/test.db`
2. Changing the migration file (`/db/migrate.js`)
3. Running `yarn run migrate`
4. If necessary, change the seed file (`/db/seed.js`) and run `yarn run seed`

# Server
## Technologies
* Node
* Express
* sqlite3
## Server Requests
The client is built using Create React App. The command listed above for starting the development server is enough to start the express server and Create React App. 

To make server requests, simply make the request with a relative path. The requests should already be proxied from the client server port (3000) to the express server port (8080).

example:
```
// relative route
await fetch('/my/route/here');

/* AVOID DOING THIS */
// absolute route 
await fetch('localhost:8080/my/route/here');
```

# Client
## Technologies
* React
* React Router
