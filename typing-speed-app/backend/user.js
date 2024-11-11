const mongoose=require('mongoose')

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    Education:{
        type:String,
        required:true
    },
    phonenumber:{
        type:String,
        required:true
    },
    typingexperienc:
    {
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    confirmpassword:{
        type:String,
        required:true
    },
    Interest:{
        type:String,
        required:true
    }

})

const User=mongoose.model("User",UserSchema)
module.exports=User;