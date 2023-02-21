const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    
    userName:{
        type:String,
        require:true,
        min:6
    },
    email :{
        type:String,
        require:true,
        min:6,
        max:256
    },
    password:{
        type:String,
        require:true,
        max:1024,
        min:6
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model("jwtUser",userSchema)