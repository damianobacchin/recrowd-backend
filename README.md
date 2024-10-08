# Recrowd Assignment - Damiano Bacchin

## 1. Start the PostgreSQL database container
In the project folder, run the following command:

```bash
docker compose up --build
```

## 2. Build the backend
```bash
npm run build
```

## 3. Apply the migrations to the database
```bash
npm run db:migrate
```

## 4. Start the backend
```bash
npm start
```