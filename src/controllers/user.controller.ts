import express from 'express';
import { Res } from '../shared/helper/api';
import User from '../model/users.model';
class Controller {

  public getuserByUserId = async (request: express.Request, response: express.Response) => {
    try {
      const UserModel = await User.findById(request.params.id);
      Res.ok(request, response, { data: UserModel });
    } catch (error) {
      Res.serverError(request, response, error);
    }
  };

  public getusersByOrganizationId = async (request: express.Request, response: express.Response) => {
    try {
      const UserModel = await User.find({ organizationId: request.params?.id });
      Res.ok(request, response, { data: UserModel });
    } catch (error) {
      Res.serverError(request, response, error);
    }
  };
}

export const UserController = new Controller();
