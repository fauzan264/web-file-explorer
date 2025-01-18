import { Elysia } from "elysia";
import { cors } from '@elysiajs/cors'
import FolderRoutes from "./routes/FolderRoutes";

const app = new Elysia();

app.group("api/v1", (app) => 
  app
    .use(FolderRoutes)
)

app.use(cors()).listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
