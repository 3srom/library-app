# Library App

COMP229 group project. Node, Express and MongoDB backend with a React (Vite) client.

## Setup

```
npm install
cd client
npm install
```

Copy `.env.example` to `.env` and put in your MongoDB connection string and a JWT secret.

## Run

From the `client` folder:

```
npm run dev
```

Backend runs on http://localhost:3000 and the client on http://localhost:5173.

## API

| Method | URL | Notes |
|---|---|---|
| POST | /api/users | sign up |
| GET | /api/users | list users |
| GET/PUT/DELETE | /api/users/:userId | signed in, own profile only for PUT/DELETE |
| POST | /auth/signin | returns token |
| GET | /auth/signout | |
| GET | /api/books | |
| POST | /api/books | admin |
| GET/PUT/DELETE | /api/books/:bookId | PUT/DELETE admin |
| DELETE | /api/books | admin, removes all |
| GET | /api/loans | admin |
| POST | /api/loans | signed in, checks out a book |
| PUT | /api/loans/:loanId/return | signed in |
| GET/PUT/DELETE | /api/loans/:loanId | PUT/DELETE admin |

Protected routes need `Authorization: Bearer <token>` from signin.

To make an admin, set `role` to `admin` on the user document in MongoDB.

Postman collection is in `postman/`.
