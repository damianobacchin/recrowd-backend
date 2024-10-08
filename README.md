# Recrowd Assignment - Damiano Bacchin

## Start the project
### 1. Start the PostgreSQL database container
In the project folder, run the following command:

```bash
docker compose up --build
```

### 2. Build the backend
```bash
npm run build
```

### 3. Apply the migrations to the database
```bash
npm run db:migrate
```

### 4. Start the backend
```bash
npm start
```

## APIs
### Get the authorization token
```
GET /auth/authorize
```
Basic Auth optional for write privileges.

Returns a uuid token valid for one request.
Use the token in the "x-auth-token" header for the next requests.

### Create a new investment
```
POST /investment/
```
Auth token required with write privileges.

Required body parameters:
- amount: the amount of the investment
- apr: the annual percentage rate of the investment
- confirmed_at: the date of the investment confirmation

### Get investments data
```
GET /investment/
```
Returns a list and the stats of the investments.

Optional query parameters:
- from: filter by date from
- to: filter by date to
- timeframe: group by timeframe:
  - d: day
  - w: week
  - m: month
  - y: year