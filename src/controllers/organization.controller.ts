import Organization from '../model/organization.model';
import express from 'express';
import { Res } from '../shared/helper/api';
class Controller {

  public getAllOrg = async (request: any, response: any) => {
    try {
      const OrgModel = await Organization.find({});
      Res.ok(request, response, { data: OrgModel });
    } catch (error) {
      Res.serverError(request, response, error);
    }
  };

  public getById = async (request: express.Request, response: express.Response) => {
    try {
      const OrgModel = await Organization.findById(request.params?.id);
      Res.ok(request, response, { data: OrgModel });
    } catch (error) {
      Res.serverError(request, response, error);
    }
  };
}

export const OrgController = new Controller();
