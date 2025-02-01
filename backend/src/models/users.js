const moongose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new moongose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        
    },
    password:{
        type: String,
        required: true,
    },
}
);

//Encriptar contraseña antes de guardar

userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});


module.exports = moongose.model('Users', userSchema);