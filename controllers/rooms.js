
const { response } = require("express");
const Room = require("../classes/room");
const User = require("../classes/user");

const getRooms = async (req, res = response) => {

    const userId = req.params.userId;
    const rooms = await Room.find({ $or: [{ create: userId} ]  }).sort('-online');

    res.json({
        ok: true,
        rooms
    });

};

const getUserRooms = async (req, res = response) => {

    const roomId = req.params.roomId;
    const rooms = await Room.find({ $or: [{ _id: roomId} ]  });

    res.json({
        ok: true,
        rooms
    });

};

const getMyRoom = async (req, res = response) => {

    
    const roomId = req.params.roomId;
    console.log('myRoomId:' + roomId);
    const room = await Room.find({ $or: [{ _id: roomId} ]  });
    console.log('myRoom:' + room);

    res.json({
        ok: true,
        room
    });

};

module.exports = { getRooms, getUserRooms, getMyRoom };