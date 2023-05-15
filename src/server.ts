import bodyParser from './middlewares/bodyParsec';
import { createServer } from 'http'
import express from 'express'
import socketServices from './services/socket';
//import { config } from 'config';
//const Database = require('./db'); //Execption of Importing flow, for setting up
// const databaseUsers = require("../databaseUsers.json");
//const MessageRouter = require("./routers/message");
import viewEngine from './configs/viewEngine';
import webRouter from './routers/web';

const port = process.env.PORT;
const hostName = process.env.HOST_NAME;

//Main block
{
  const app = express();
  const httpServer = createServer(app);

  //Configure temple engine
  viewEngine(app);
  //Configure bodyparser to handle post requests
  bodyParser(app);
  //Router
  app.use(webRouter);

  //Initialize socket connection
  socketServices(httpServer);

  httpServer.listen(port, () => {
    console.log(port);
  });
}

//const databaseUsers = require("./databaseUsers.json");
const connectedUsers = [] as string[];

