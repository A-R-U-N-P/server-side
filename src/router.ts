import * as express from 'express';
import { validator } from './middleware/validator';
import { AuthRouter } from './router/auth-router';
import { OrgRouter } from './router/organization.router';
import { UserRouter } from './router/user.router';

const router = express.Router();
router.use('/auth', validator.validateToken, AuthRouter);
router.use('/organization', validator.validateToken, OrgRouter);
router.use('/user', validator.validateToken, UserRouter);
export { router };
