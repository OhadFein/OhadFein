import bodyParser from 'body-parser';
import compression from 'compression';
import cors = require('cors');
import dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';
import path from 'path';
import { infoLogger, errorLogger } from './utils/logger';
import morgan from "morgan";

dotenv.config({ path: '.env' });

/**
 * Module dependencies.
 */

import api from './routes/api';
import homeController from './controllers/frontend/home';
// import adminController from './controllers/frontend/admin';
import HttpException from './shared/exceptions';

/**
 * Create Express server.
 */

const app = express();

/**
 * Connect to MongoDB.
 */

const MONGO_URI = (process.env.NODE_ENV === 'development') ?
  process.env.MONGODB_DEVELOPMENT_URI : process.env.MONGODB_PRODUCTION_URI;

mongoose.connect(MONGO_URI,
  {
    autoIndex: false, // TODO:
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  }
)
  .then(() => infoLogger.write("Connected to MongoDB..."))
  .catch(err => {
    errorLogger.write(err);
    errorLogger.write('MongoDB connection error. Please make sure MongoDB is running.');
    process.exit();
  });

/**
 * Express configuration.
 */
app.set('host', '0.0.0.0');
app.set('port', process.env.PORT || 8080);

app.use(helmet());
app.use(cors())
app.use(compression());
app.use(morgan("combined", {
  // errorLogger tracing for info level too
  skip: function (req: Request, res: Response) { return res.statusCode < 400 },
  "stream": errorLogger
}));
app.use(morgan("combined", {
  skip: function (req: Request, res: Response) { return res.statusCode >= 400 },
  "stream": infoLogger
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve only the static files form the dist directory
app.use(
  express.static(
    path.join(__dirname, '..', '..', '..', 'packages', 'client', 'dist', 'webapp'),
    {
      maxAge: 3600000,
    }
  )
);

app.use('/admin',
  express.static(
    path.join(__dirname, '..', '..', '..', 'packages', 'admin', 'dist', 'admin'),
    {
      maxAge: 3600000,
    }
  )
);

// App routes
app.use('/api/v1', api);

// Cath-all admin route to angular admin
// app.get('/admin/*', (req, res, next) => { return adminController(req, res, next); });

// Cath-all route to angular app
app.get('/*', (req, res, next) => { return homeController(req, res, next); });

/**
 * Error Handler.
 */

const logErrors = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err && err.stack)
    errorLogger.write(err.stack);

  next(err);
}

const clientErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' })
  } else {
    next(err);
  }
}

const errorHandler = (err: HttpException, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err);
  }
  const message = (process.env.NODE_ENV === 'development') ? err.message : 'Server Error';
  const errorCode = err.status || 500;
  res.status(errorCode).json({ error: message });
}

app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
  const port = app.get('port') as number;
  const env = app.get('env') as string;

  infoLogger.write(`App is running at http://localhost:${port} in ${env} mode`);
});

module.exports = app;
