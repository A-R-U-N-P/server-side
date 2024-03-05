import { Router } from 'express';
import { OrgController } from '../controllers/organization.controller';
import { jwtMiddleWare } from '../config/passport.config';

const OrgRouter = Router();

/* ---------------------ROUTER 2-------------------------------------*/
OrgRouter.get(
  '/',
  OrgController.getAllOrg
);
OrgRouter.get(
  '/:id', jwtMiddleWare,
  OrgController.getById
);
/* -----------------------------------------------------------------*/

export { OrgRouter };
