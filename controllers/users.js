const { response } = require("express");
const User = require("../classes/user");

const getUsers = async (req, res = response) => {

    const uid = req.uid;

    const users = await User.find({_id: {$ne: uid}}).sort('-online');

    res.json({
        ok: true,
        users
    });

};

module.exports = { getUsers };