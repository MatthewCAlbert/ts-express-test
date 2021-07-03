import express from "express";
import User from "../models/User";
import utils from '../lib/utils';

class AuthController {

  static login(req: express.Request, res: express.Response, next: express.NextFunction): void {
    User.findOne({username: req.body.username})
    .then((user)=>{
      if(!user){
        res.status(401).json({success:false, msg: "user not found"});
      }

      const isValid = utils.validPassword(req.body.password, user.hash, user.salt);

      if(isValid){
        const tokenObj = utils.issueJWT(user);

        res.status(200).json({success:true, token: tokenObj.token, expiresIn: tokenObj.expires});
      }else
        res.status(401).json({success:false, msg: "wrong password"});
    })
    .catch(err=>res.status(500).json({success:false, error: err}));
  }

  static logout(req: express.Request, res: express.Response): void {
   res.send("Hello World!"); 
  }

  static destory(req: express.Request, res: express.Response, next: express.NextFunction): void {
   const {username} = req.params;
    User.findOneAndDelete({username: username}).then(() =>
      res.send(200).json({success: true, message: "User deleted!"})
    )
    .catch(err=>res.status(500).json({success:false, error: err}));
  }

  static register(req: express.Request, res: express.Response, next: express.NextFunction): void {
   const saltHash = utils.genPassword(req.body.password);

   const salt = saltHash.salt;
   const hash = saltHash.hash;

   const newUser = new User({
    username: req.body.username,
    hash: hash,
    salt: salt,
   });

   newUser.save()
   .then(user=>{
    const jwt = utils.issueJWT(user);

     res.json({success: true, user: user, token: jwt.token, expiresIn: jwt.expires})
   })
    .catch(err=>res.status(500).json({success:false, error: err}));
  }
}

export default AuthController;