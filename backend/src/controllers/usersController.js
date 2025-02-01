const Users = require('../models/users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


// Registro 

exports.register = async (req, res) => {
    try {
        const {username, email , password} = req.body;
        console.log(req.body);
        const existingUser = await Users.findOne({email});
        if(existingUser){
            return res.status(400).json({message: 'El Usuario ya existe!'});
        }
        const newUser = new Users({ username, email, password });
        await newUser.save();
        res.status(201).json({newUser});
    } catch (error) {
        res.status(400).json({ message: 'Error al crear el usuario!' });      
    }
};



// Login

exports.login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const userLogin = await Users.findOne({email});
        if(!userLogin || !(await bcrypt.compare(password, userLogin.password))){
            return res.status(400).json({error: 'Credenciales incorrectas!'});
        }
        const token = jwt.sign({id: userLogin._id}, process.env.JWT_SECRET,
            {expiresIn: '1m'}
        );
        res.status(200).json({ token, userId: userLogin._id });
    } catch (error) {
        res.status(400).json({error: 'Error al iniciar sesión!'});
    }
};
