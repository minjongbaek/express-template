import { App } from './app';
import { UserRoute } from './routes/users.route';

const routes = [new UserRoute()];

const app = new App(routes);

app.listen();
