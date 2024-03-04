import express from 'express';
import cors from 'cors';
import { router } from './router';
import { Res, corsOptions } from './shared/helper/api';
import { logger } from './shared/helper/logger';
import { connectToDatabase } from './config/mongodb.config';
import session from 'express-session';
import passport from 'passport';


(async () => {
  try {
    const app = express();
    app.use(express.json());
    app.use(cors(corsOptions));
    const port = 3008;
    app.use(express.urlencoded({ extended: true }));

    // -------------------------------------------
    // Use express-session middleware
    app.use(session({ secret: 'server-secret-key', resave: false, saveUninitialized: false }));

    // Initialize passport
    app.use(passport.initialize());
    app.use(passport.session());

    // ---------------------------------------------
    await connectToDatabase();
    app.use('/', router);

    app.all('*', (req: express.Request, res: express.Response) => {
      Res.notFound(req, res);
    });

    app.listen(port, () => {
      logger.log(`SERVER RUNNING ON :${port}`);
    });
  } catch (error) {
    logger.error('SERVER DOWN :(', error);
  }
})();
