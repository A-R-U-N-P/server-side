import { Router } from 'express';
import { OrgController } from '../controllers/organization.controller';
import { UserController } from '../controllers/user.controller';

const UserRouter = Router();

/* ---------------------ROUTER 2-------------------------------------*/
UserRouter.get(
  '/userId/:id',
  UserController.getuserByUserId
);

UserRouter.get(
  '/organizationId/:id',
  UserController.getusersByOrganizationId
);
/* -----------------------------------------------------------------*/

export { UserRouter };
