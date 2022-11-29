 import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { SignUpInterface, LogInInterface} from './model';
import {SignUp} from './model';
import { transporter, mailOptions} from "../config/nodemailer";
export const signUpController = async(user:SignUpInterface)=>{
   const data = await SignUp.find({email:user.email});
   if(data.length == 0){
    const salts = bcrypt.genSaltSync(parseInt(process.env.SALTROUNDS!));
    const hashedPassword =  bcrypt.hashSync(user.password,salts);
    user.password=hashedPassword;
    await new SignUp(user).save();
    await transporter.sendMail(mailOptions,(err,info)=>{
        if(err){
            console.error(err);
            throw err;
        }else{
            console.log('Email sent: '+info.response)
        }
    })
    return {
        message:true,
        token:jwt.sign({id:data},process.env.JWTSECRET!)
    };
   }else{
    return {
        message:false
    };
   }
}
export const logInController = async(user:LogInInterface)=>{
    const data = await SignUp.findOne({email:user.email});
    if (data === null) {
      return null;
    }
    else {
      return bcrypt.compareSync(user.password, data.password)?jwt.sign({id:data._id},process.env.JWTSECRET!):null;
    }
}
