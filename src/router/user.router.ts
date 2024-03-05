import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { jwtMiddleWare } from '../config/passport.config';

const UserRouter = Router();

/* ---------------------ROUTER 2-------------------------------------*/
UserRouter.get(
  '/userId/:id',
  jwtMiddleWare,
  UserController.getuserByUserId
);

UserRouter.get(
  '/organizationId/:id', jwtMiddleWare,
  UserController.getusersByOrganizationId
);
/* -----------------------------------------------------------------*/

export { UserRouter };
