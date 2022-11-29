import express,{Express,Request,Response} from 'express';
import mongoose,{ConnectOptions} from 'mongoose';
import dotenv from 'dotenv';
import authRouter from './auth/router';
import uploadHandler from './uploads/imageUploader';
dotenv.config();
const app:Express = express();
const port:number = 2000  || process.env.PORT ;
app.use(express.json());
app.use(express.urlencoded({extended:true}));
mongoose.connect(`${process.env.MONGODB_URI}`,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}as ConnectOptions,(err)=>{
    if(err)
    console.log("Error connecting to the Database")
    else
    console.log("Db connected successfully");
})
app.get('/',(req:Request,res:Response)=>{
    res.send('Learning');
});
app.use(authRouter);
app.use(uploadHandler);
app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
})
