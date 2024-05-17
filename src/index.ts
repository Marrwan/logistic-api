import express, { Application, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import authRouter from './routes/auth';
import packageRouter from "./routes/package"
import sequelize from './config/db';
import { SchedulerService } from './services/scheduler.service';


declare global {
    namespace Express {
      interface Request<ParamsDictionary = {}, Body = any, Query = any, Files = any, Custom extends Record<string, any> = {}> {
        validatedData?: Custom;
        user?:Custom;
      }
    }
  }
dotenv.config();

const app: Application = express();

app.use(bodyParser.json());

interface ErrorWithStatusCode extends Error {
    statusCode?: number;
  }
  
  const errorHandler: (err: ErrorWithStatusCode, req: Request, res: Response, next: NextFunction) => void = (
    err: ErrorWithStatusCode,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    res.setHeader('Content-Type', 'application/json');
    console.log("I REACH OOO");
    
    if (!err.statusCode) {

      err.message = err.message || 'Internal Server Error'; // Set a generic message
    }
    
    if(err.message.includes("Validation")){
        err.statusCode = 400;
    }

    if (err.name == 'Validation error') {
      err.statusCode = 400;
      err.message = err.message.replace('ValidationError: ', '');
    }
   
  
    return res.status(err.statusCode || 500).json({ error: err.message });
  };

// sequelize.sync()
// Routes
app.use('/auth', authRouter);
app.use('/packages', packageRouter);

app.use(errorHandler);


let job  =  new SchedulerService()
job.startBackgroundJob()

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
