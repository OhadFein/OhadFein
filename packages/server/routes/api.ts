import express, { Application } from "express";
import { checkAuth } from '../middleware/checkAuth';
import { checkCoachPermissions, checkAdminPermissions } from "../middleware/checkPermissions";

import user from './user';
import account from './account';
import stars from './stars';
import figures from './figures';
import videos from './videos';
import coaches from './coaches'
import students from './students'
import admins from './admins'
import notifications from './notifications'

const app: Application = express();

app.use('/', user);
app.use('/account', checkAuth, account);
app.use('/stars', checkAuth, stars);
app.use('/figures', checkAuth, figures);
app.use('/videos', checkAuth, videos);
app.use('/notifications', checkAuth, notifications);
app.use('/coaches', checkAuth, coaches);
app.use('/students', [checkAuth, checkCoachPermissions], students);
app.use('/admins', [checkAuth, checkAdminPermissions], admins);

export default app;