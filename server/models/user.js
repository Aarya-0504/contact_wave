//comments are for my understanding 
const mongoose=require('mongoose')
//creating schema of database
const structure=new mongoose.Schema({
    name:{
        type:String,
        rewuire:[true, "Name space should not be empty!"]
    },
    email: {
        type: String,
        required: [true, "email space should not be empty!"],
      },
      password: {
        type: String,
        required: [true, "Password is Mandatory!"],
      }
});
//creating model of scheme
const User = new mongoose.model("User", structure);
//exporting the module
module.exports = User;