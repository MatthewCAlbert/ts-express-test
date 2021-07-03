import express from 'express';
import jsonwebtoken from 'jsonwebtoken';
import path from 'path';
import fs from 'fs';

const pathToKey = path.join(__dirname, "..", "..", "id_rsa_pub.pem");
const PUB_KEY = fs.readFileSync(pathToKey, "utf8");

const authCustom = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const tokenParts = req.headers.authorization.split(" ");
  if( tokenParts[0] === "Bearer" && tokenParts[1].match(/\S+\.\S+\.\S+/) !== null ){

    try{
      jsonwebtoken.verify(tokenParts[1], PUB_KEY, {algorithms: ['RS256']});
    }catch(err){
      res.status(401).json({success: false, message: "Unauthorized"});
    }

  }

}

export default authCustom;