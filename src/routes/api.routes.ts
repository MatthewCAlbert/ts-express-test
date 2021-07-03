import express from 'express';
import passport from 'passport';
import ApiController from "../controllers/ApiController";
import AuthController from '../controllers/AuthController';
import {validator} from '../middlewares/validator';
import authSchemas from '../validations/auth.validation';

const apiRouter = express.Router();

apiRouter.get("/", ApiController.helloWorldHandler);

apiRouter.get("/users", ApiController.allUser);
apiRouter.delete("/all", ApiController.clearDb);
// apiRouter.get("/clearToken", ApiController.getClearDbToken);

apiRouter.get("/protected", passport.authenticate('jwt',{session: false}), ApiController.testAuth);

apiRouter.post("/login", validator(authSchemas.login), AuthController.login);
// apiRouter.post("/logout", AuthController.logout);
apiRouter.post("/register", validator(authSchemas.register), AuthController.register);
apiRouter.delete("/user/:username", AuthController.destory);

module.exports = apiRouter;
