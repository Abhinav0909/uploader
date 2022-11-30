import mongoose,{Schema,Document} from "mongoose"
export interface SignUpInterface extends Document{
    email:string,
    first_name:string,
    last_name:string,
    password:string,
    age:number,
    city:string
}
export interface LogInInterface extends Document{
    email:string,
    password:string
}
const SignUpSchema:Schema = new Schema<SignUpInterface>({
    email:{type:String,required:true},
    first_name:{type:String,required:true},
    last_name:{type:String,required:true},
    password:{type:String,required:true},
    age:{type:Number,required:true},
    city:{type:String,required:true}
})
const LogInSchema:Schema = new Schema<LogInInterface>({
   email:{type:String,required:true},
   password:{type:String,required:true} 
})
export const SignUp = mongoose.model<SignUpInterface>("SignUp",SignUpSchema);
export const LogIn = mongoose.model<LogInInterface>("LogIn",LogInSchema);
