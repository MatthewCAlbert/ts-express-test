import express from 'express';
import passport from 'passport';
import ApiController from "../controllers/ApiController";
import AuthController from '../controllers/AuthController';

const apiRouter = express.Router();

apiRouter.get("/", ApiController.helloWorldHandler);

apiRouter.get("/protected", passport.authenticate('jwt',{session: false}), ApiController.testAuth);

apiRouter.post("/login", AuthController.login);
// apiRouter.post("/logout", AuthController.logout);
apiRouter.post("/register", AuthController.register);
apiRouter.delete("/user/:username", AuthController.destory);

module.exports = apiRouter;
