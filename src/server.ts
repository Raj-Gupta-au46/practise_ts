import App from "./app";
import { port } from "./config";

const app = new App();

app.listen({
  topMiddleWare: [],
  bottomMiddleWare: [],
  port,
});
