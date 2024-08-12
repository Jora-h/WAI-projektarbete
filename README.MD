# Web Security

## Setup

### Environment variables

## Bakend

- Duplicate `backend/.env.sample` and rename to `backend/.env`
- Add missing env values (`DB_NANE` & `DB_PASS` should be desired DB username and password)

## Frontend

- Duplicate `frontend/.env.sample` and rename to `frontend/.env`
- Add missing value (change if the url has changed)

## Start the App

### Frontend

start frontend app by going to frontend folder and run

```
npm run start
```

### Backend

start backend by going to backend folder and run

```
docker-compose up --build
```

`schema.sql` is a script that will create a user with role `admin` for you with email `admin@example.com` password `password123`

- open app in `http://localhost:3001`
- by default you will land on `/home` page where you can either `login` or `register`
- and after register & login (or use existing admin account to sign in) you should land in account page.
- then you can either logout or invite a user if you have admin role.
