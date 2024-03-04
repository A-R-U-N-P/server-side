import { Router } from 'express';
import { OrgController } from '../controllers/organization.controller';

const OrgRouter = Router();

/* ---------------------ROUTER 2-------------------------------------*/
OrgRouter.get(
  '/',
  OrgController.getAllOrg
);
OrgRouter.get(
  '/:id',
  OrgController.getById
);
/* -----------------------------------------------------------------*/

export { OrgRouter };
