import fs from "fs";
import path from "path";
import User from '../models/User';
import {Strategy as JwtStrategy, ExtractJwt} from "passport-jwt";

const pathToKey = path.join(__dirname, "..", "..", "id_rsa_pub.pem");
const PUB_KEY = fs.readFileSync(pathToKey, "utf8");

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithm: ['RS256']
};

const strategy = new JwtStrategy(options, (payload, done)=>{
  User.findOne({_id: payload.sub})
  .then((user)=>{
    if( user) return done(null,user);
    else return done(null, false);
  })
  .catch(err => done(err,null));
});

export default strategy;
