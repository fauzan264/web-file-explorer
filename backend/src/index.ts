import { Elysia } from "elysia";
import FolderRoutes from "./routes/FolderRoutes";

// const app = new Elysia().get("/", () => "Hello Elysia").listen(3000);

const app = new Elysia();

// route home
app.get('/', () => 'Hello Elysia!');

app.group("api/v1", (app) => 
  app
    .use(FolderRoutes)
    // .use(Routes)
)

app.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
