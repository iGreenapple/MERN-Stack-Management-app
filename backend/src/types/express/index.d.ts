import * as express from 'express';
import { JwtPayload } from 'jsonwebtoken';

// rozšíření typového prostoru pro express Request → přidáváme vlastní atribut userToken
declare global {
  namespace Express {
    export interface Request {
      userToken?: JwtPayload;
    }
  }
}
