import express = require('express');
import jwt from 'jsonwebtoken';
export interface AuthRequest extends express.Request{
   user?: jwt.JwtPayload
}