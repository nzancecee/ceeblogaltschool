const mongoose= require('mongoose');
const bcrypt = require('bcrypt');


const UserSchema = new mongoose.Schema({
firstName:{
    type: String,
    required: true
},

lastName: {
    type: String,
    required: true
},



email:{
    type: String,
    required: true,
    unique: true
},

password:{
    type: String,
    required:true ,
},

created: {
    type: Date,
    default:Date.now()}
});

// encrypt password before saving
UserSchema.pre(
    'save',
    async function(next){
        const user = this;
        const hash = await bcrypt.hash(this.password,10);
    
        this.password = hash;
        next()
    }
);

UserSchema.methods.isValidPassword = async function(password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
  
    return compare;
  }


module.exports = mongoose.model("User", UserSchema)

