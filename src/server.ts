import bodyParser from "body-parser";
import cors from "cors";
import { config } from 'dotenv';
import express from 'express';
import { userRoutes } from './routes/user.routes';
import { videosRoutes } from './routes/videos.routes';

config();

const app = express();
app.use(cors());

app.use(function(req , res, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept" );
  res.header("Access-Control-Allow-Methods", 'post, GET, PATH, DELETE, OPTIONS');
  next();
})



app.use(express.json());   
app.use(bodyParser.json());

app.use('/user', userRoutes);   
app.use('/videos', videosRoutes);   


app.listen(4000,() => console.log('Servidor rodando na porta 4000'));