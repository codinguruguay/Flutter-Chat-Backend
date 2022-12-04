const { response } = require("express");
const bcrypt = require('bcryptjs');
const User = require('../classes/user');
const Room = require('../classes/room');
const { generateJWT } = require("../helpers/jwt");
const e = require("express");


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
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                ok: false,
                msg: 'Error! Email no encontrado .'
            });
        }

        const validatePassword = bcrypt.compareSync(password, user.password); 

        if (!validatePassword) {
            return res.status(400 ).json({
                ok: false,
                msg: 'Error! Password inválido.'
            });
        }

        // Generar JWT
        const token = await generateJWT(user.id);

        res.json({
            ok: true,
            user: user,
            token
        });
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error! Hable con el administrador.'
        });
    }
};


const createRoom = async (req, res = response) => {

    const { createReq } = req.body;

    try {
        const exist = await Room.find({ $or: [{ create: createReq }] });

        if (exist.length != 0) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya tienes una Room creada'
            });
        }

        const room = new Room(req.body)

        await room.save();

        res.json({
            ok: true,
            room
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};


const renewToken = async (req, res = response) => {

    const uid = req.uid;
    const token = await generateJWT(uid);
    const user = await User.findById(uid);

    res.json({
        ok: true,
        user,
        token
    });

};


module.exports = { createUser, loginUser, renewToken, createRoom };