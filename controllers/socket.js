
const User = require('../classes/user');
const Room = require('../classes/room');
const Message = require('../classes/message');

const userOnline = async (uid = '') => {
    const userDB = await User.findById(uid);
    userDB.online = true;
    await userDB.save();

    return userDB;
}

const roomOnline = async (uid = '') => {
    const roomDB = await Room.find({ $or: [{ create: uid} ] });

    //roomDB.online = true;
    //await roomDB.save();

    return roomDB;
}

const userOffline = async (uid = '') => {
    const userDB = await User.findById(uid);
    userDB.online = false;
    await userDB.save();

    return userDB;
}

const roomOffline = async (uid = '') => {
    const roomDB = await Room.find({ $or: [{ create: uid} ] });
    // roomDB.online = false;
    // await roomDB.save();

    return roomDB;
}

const saveMessage = async (payload) => {
    try {
        const message = new Message(payload);
        await message.save();

        return true;
    } catch (error) {
        return false;
    }
}

module.exports = {
    userOnline,
    userOffline,
    roomOnline,
    roomOffline,
    saveMessage
};