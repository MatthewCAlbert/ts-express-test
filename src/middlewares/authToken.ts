import jwt from 'jsonwebtoken';
import express from 'express';
import {AuthRequest} from '../types/express';

const authToken = (req: AuthRequest, res: express.Response, next: express.NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token: string|undefined = authHeader && authHeader.split(" ")[1];
  if (token === null) return res.sendStatus(401);

  jwt.verify(String(token), String(process.env.ACCESS_TOKEN_SECRET), (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

export default authToken;
