import { NextFunction } from 'express';
import { Res } from '../shared/helper/api';

export class validator {
  public static validateToken(request: any, response: any, next: NextFunction) {
    if (request) {
      // logger.log('MIDDLLE WARE CHECK');
      next();
    } else {
      Res.badRequest(request, response, 'Invalid Request', 'MIDDLE WARE');
    }
  }
}
