import {Request,Response,Router} from 'express';
import Joi from 'joi';
import {signUpController,logInController} from './controller'
const authRouter = Router();
const SignUpHandler = async(req:Request,res:Response) =>{
    try{
        const schema = Joi.object({
            email:Joi.string().email().required(),
            first_name:Joi.string().required(),
            last_name:Joi.string().required(),
            password:Joi.string().required(),
            age:Joi.number().required(),
            city:Joi.string().required()
        })
        const {value,error}= schema.validate(req.body);
        if(error){
            throw{
                status:422,
                message:'Validation error'
            }
        }else{
            signUpController(value).then((val:any)=>{
                if(val.message === true){
                    res.status(201).json({
                        status:200,
                        message:"Success",
                        jwt_token:val.token
                    })
                }else{
                    res.status(403).json({
                        message:"User already exists",
                    })
                }
            })
        }
    }catch(err:any){
    res.status(err.status || 500).json({
        message:err.message || 'An error occured'
    })

}
    }
    export const LogInHandler = async(req:Request,res:Response) =>{
        try{
            const schema = Joi.object({
                email:Joi.string().required(),
                password:Joi.string().required(),
            })
            const {value,error} = schema.validate(req.body);
            if(error){
                throw{
                    status:422,
                    message:'Validation error' 
                }
            }else{
                logInController(value).then((val:any)=>{
                    if(val !== null){
                        res.status(201).json({
                            status:200,
                            message:"Success",
                            token:val
                        })
                    }else{
                        res.status(403).json({
                            message:"LogIn failed",
                        })
                    }
                })
            }
        }
        catch(err:any){
            res.status(err.status || 500).json({
            message:err.message || 'An error occured'
        })
        }
    }
authRouter.post('/register',SignUpHandler);
authRouter.post('/login',LogInHandler);
export default authRouter;
