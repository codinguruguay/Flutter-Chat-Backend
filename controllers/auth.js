const { response } = require("express");
const bcrypt = require('bcryptjs');
const User = require('../classes/user');
const { generateJWT } = require("../helpers/jwt");


const createUser = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        const emailExist = await User.findOne({ email });

        if (emailExist) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un usuario con este correo'
            });
        }

        const user = new User(req.body)

        // Encriptar Password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        // Generar JWT
        const token = await generateJWT(user.id);

        res.json({
            ok: true,
            user,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }



};


const loginUser = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        const userDB = await User.findOne({ email });

        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Error! Email no encontrado .'
            });
        }

        const validatePassword = bcrypt.compareSync(password, userDB.password); 

        if (!validatePassword) {
            return res.status(400 ).json({
                ok: false,
                msg: 'Error! Password inválido.'
            });
        }

        // Generar JWT
        const token = await generateJWT(userDB.id);

        res.json({
            ok: true,
            user: userDB,
            token
        });
        
    } catch (error) {
        
        return res.status(500).json({
            ok: false,
            msg: 'Error! Hable con el administrador.'
        });

    }

};


const renewToken = async (req, res = response) => {

    const uid = req.uid;
    const token = await generateJWT(uid);
    const userDB = await User.findById(uid);

    res.json({
        ok: true,
        userDB,
        token
    });

};


module.exports = { createUser, loginUser, renewToken };