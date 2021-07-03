import crypto from "crypto";
import express from "express";
import User from "../models/User";
class ApiController {
  static helloWorldHandler(req: express.Request, res: express.Response): void {
    res.status(200).json({message: "Hello World!"}); 
  }

  static testAuth(req: express.Request, res: express.Response): void {
    res.status(200).json({success:true, message: 'Authenticated'}); 
  }

  static allUser(req: express.Request, res: express.Response): void {
    User.find({})
    .then(users=>{
      let data = users.map(el=>{
        return {_id: el._id, username: el.username, createdAt: el.createdAt, updatedAt: el.updatedAt};
      });
      res.status(200).json({success:true, data });
    })
    .catch(err=>res.status(500).json({success:false, error: err}));
  }

  static getClearDbToken(req: express.Request, res: express.Response){
    if( process.env.NODE_ENV === "development" ){
      req.session.dToken = crypto
        .randomBytes(16)
        .toString('base64')
        .slice(0, 16);
    }else{
        res.sendStatus(403);
    }
  }

  static async clearDb(req: express.Request, res: express.Response) {
    if( process.env.NODE_ENV === "development" ){
      const response = await User.deleteMany({});
      res.send(response ? true:false);
    }
    res.sendStatus(403);
  }

}

export default ApiController;