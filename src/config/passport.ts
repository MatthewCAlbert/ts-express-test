import User from '../models/User';
import {Strategy as JwtStrategy, ExtractJwt} from "passport-jwt";
import { PUB_KEY } from "../lib/secrets";

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
