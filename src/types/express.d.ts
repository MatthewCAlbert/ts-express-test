import express from "express";
import jwt from 'jsonwebtoken';
import { UserDocument } from '../models/User';

declare module "express" {
    export interface Request {
      user?: jwt.JwtPayload | UserDocument
    }
}
