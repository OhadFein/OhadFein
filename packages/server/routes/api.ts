import express, { Application } from "express";
import { checkAuth } from '../middleware/checkAuth';
import { checkAdminRights } from "../middleware/checkAdminRights";

import user from './user';
import account from './account';
import stars from './stars';
import figures from './figures';
import videos from './videos';

const app: Application = express();

app.use('/', user);
app.use('/account', checkAuth, account);
app.use('/stars', checkAuth, stars);
app.use('/figures', checkAuth, figures);
app.use('/videos', checkAuth, videos);
// app.use('/admins', [checkAuth, checkAdminRights], admins);

export default app;