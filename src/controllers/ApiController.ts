import mongoose from "mongoose";
import express from "express";
import User from "../models/User";

class ApiController {
  static helloWorldHandler(req: express.Request, res: express.Response): void {
   res.status(200).json({message: "Hello World!"}); 
  }

  static testAuth(req: express.Request, res: express.Response): void {
   res.status(200).json({success:true, message: 'Authenticated'}); 
  }
}

export default ApiController;