# Web File Explorer Backend and Frontend Project with Bun.js, Elysia.js, Prisma, and Vue.js

This project uses **Bun.js** for the backend with **Elysia.js** and **Prisma ORM** for managing the database, while the frontend uses **Vue.js** version `^3.5.13`.

## Features:
- Backend powered by **Bun.js** and **Elysia.js** for API routing.
- **Prisma ORM** for database management.
- **Vue.js** for the frontend, providing a single-page application.
- **Docker** is used to run MySQL to avoid the need for local database installation.

## Prerequisites
- **Docker** (to run MySQL in a container).
- **Bun.js** (make sure it's installed on your system).

### Installation Steps

1. **Clone the repository**:
   ```bash
        git clone <URL_REPOSITORY>
        cd <PROJECT_FOLDER>
   ```


2. Setup Backend: Navigate to the backend folder and install dependencies:
   ```bash
        cd backend
        bun install
    ```

3. Setup Frontend: Navigate to the frontend folder and install dependencies:
   ```bash
        cd frontend
        bun install
    ```

4. Run MySQL with Docker (optional if you don't want to install MySQL locally): If you prefer not to install MySQL locally, you can use Docker to run MySQL.
Run the following command at the root of the project:
   ```bash
        docker-compose up -d
    ```

Ensure you configure the .env file in the project root.
.env file at the root:
    ```
        DB_HOST=
        DB_PORT=
        DB_USER=
        DB_PASSWORD=
    ```

5. Prisma Setup: Ensure you configure the .env file in the project backend folder.
.env file inside the backend folder (for Prisma connection):
    ```
        DATABASE_URL="mysql://root:password@localhost:3306/dbname"
    ```

6. Run Prisma: After setting up the .env files, run the following commands to initialize Prisma and apply database migrations:
    ```bash
        bun prisma init
    ```

Then, apply the database migrations:
    ```bash
        bun prisma migrate dev
    ```

This will set up the database tables as defined in the Prisma schema.

7. Start Both Backend and Frontend
To start both the backend and frontend simultaneously, run the following command from the root folder:
    ```bash
        bun dev
    ```
This will start both the Bun.js server for the backend and the Vue.js development server for the frontend.

8. Access the Application
After running the bun dev command, the application will be accessible:
Backend API will be running at http://localhost:3000
Frontend will be available at http://localhost:5173
