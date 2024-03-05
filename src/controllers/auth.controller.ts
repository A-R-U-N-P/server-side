import { Res } from '../shared/helper/api';
import express from 'express';
import { logger } from '../shared/helper/logger';
import User from '../model/users.model';
import Organization from '../model/organization.model';
import { hashPassword } from '../shared/helper/hash-password';
import Auth from '../model/auth.model';
import jwt from 'jsonwebtoken';
import { JwtOptions } from '../config/passport.config';

class Controller {
  public signUp = async (request: express.Request, response: express.Response) => {
    logger.log("SIGN UP REQUEST ", request.body);
    try {
      const body = request.body;
      switch (true) {
        case body.role == 'user':
          const UserAlreadyExists = await Auth.findOne({ email: body.email });
          if (UserAlreadyExists) {
            throw { error_msg: "User with the given email already exists" };
          }
          const userModel = new User(body);
          await userModel.save();
          const UserAuthModel = new Auth({ email: body.email, role: body.role, password: await hashPassword(body.password), organizationId: body.organizationId });
          await UserAuthModel.save();
          break;

        case body.role == 'organization':
          const alreadyExists = await Auth.findOne({ email: body.email });
          if (alreadyExists) {
            throw { error_msg: "Organization with the given email already exists" };
          }
          const organizationModel = new Organization(body);
          const orgRes = await organizationModel.save();
          const OrgAuthModel = new Auth({ email: body.email, role: body.role, password: await hashPassword(body.password), organizationId: orgRes._id });
          await OrgAuthModel.save();

          break;

        case body.role == 'admin':
          const adminAlreadyExists = await Auth.findOne({ email: body.email });
          if (adminAlreadyExists) {
            throw { error_msg: "Admin with the given email already exists" };
          }
          const AuthModel = new Auth({ email: body.email, role: body.role, password: await hashPassword(body.password) });
          await AuthModel.save();
          break;

        default:
          throw { error_msg: "role is missing" };

      }

      Res.ok(request, response, { message: `${body.role == 'user' ? 'user' : body.role == 'organization' ? 'organization' : 'admin'} created successfully !` });
    } catch (error) {
      logger.log("SIGN UP ERROR", error);
      Res.serverError(request, response, error);
    }
  };

  public login = async (request: express.Request, response: express.Response) => {
    const token = jwt.sign({ id: request.user["_id"] }, JwtOptions.secretOrKey, { expiresIn: 3600 });
    const orgRes = await Organization.findById(request.user["organizationId"]);
    const userRes: any = await User.findOne({ organizationId: request.user["organizationId"] });
    const data: any = request.user;
    Res.ok(request, response, {
      message: 'Login successful', data: {
        email: data._doc.email,
        organizationId: data._doc.organizationId,
        role: data._doc.role,
        orgName: orgRes?.name,
        token,
        _id: userRes?._id
      }
    });
  };
}

export const AuthController = new Controller();
