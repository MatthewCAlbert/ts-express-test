import mongoose from 'mongoose';
import logger from '../lib/logger';
import { MONGODB_URI } from '../lib/secrets';

function connect(){
  if( process.env.NODE_ENV !== "production" ){
    mongoose.set("debug", true);
  }
  mongoose.connect(MONGODB_URI, {
    authSource: "admin",
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(()=>{
    logger.info("Database connected!");
  })
  .catch(err=> {
    logger.info("Database connection error!");
    console.log(err)
    process.exit(1);
  }
  );
}

export {connect};