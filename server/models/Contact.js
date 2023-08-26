const mongoose=require('mongoose');

const Joi=require('joi');

const ContactSchema=new mongoose.Schema({
    name:{
        type: String,
        required:[true,"name is required"]
    },
    address: {
        type: String,
        required: [true, "address is required."],
      },
      email: {
        type: String,
        required: [true, "Email is required."],
      },
      phone: {
        type: Number,
        required: [true, "Phone number is required."],
      },
      age: {
        type: Number,
        required: [true, "age is required."],
      },
      postedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User" //if any issue then change to structure || user
      }
});

const Contact=new mongoose.model("Contact",ContactSchema);

const validateContact= (data)=>{
    const schema=Joi.object({
        name: Joi.string().min(4).max(50).required(),
        address: Joi.string().min(4).max(100).required(),
        email: Joi.string().email().required(),
        phone: Joi.number().min(7).max(10000000000).required(), 
        age: Joi.number().min(18).max(100).required(),
    });

    return schema.validate(data);
}
module.exports={
    validateContact,
    Contact,
};