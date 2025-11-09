const {Schema} = require("mongoose")
const UsersSchema = new Schema({
  email: {
    type: String,
    required: [true, "Your email address is required"],
    unique: true,
  },
  name: {
    type: String,
    required: [true, "Your username is required"],
  },
  password: {
    type: String,
    required: [true, "Your password is required"],
  },
  mobileNumber:{
    type:String,
    required:true
  }
},{timestamps:true})

UsersSchema.pre("save",async function(){
    this.password = await bcrypt.hash(this.password,12);
})

module.exports = {UsersSchema}