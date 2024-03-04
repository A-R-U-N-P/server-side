import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { jwtMiddleWare, loginMiddleWare } from '../config/passport.config';

const AuthRouter = Router();

/* ---------------------ROUTER 1----------------------------*/
AuthRouter.post(
  '/sign-up',
  AuthController.signUp
);
AuthRouter.post(
  '/login', loginMiddleWare,
  AuthController.login
);
/* ----------------------------------------------------------*/

export { AuthRouter };
