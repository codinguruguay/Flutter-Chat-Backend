
const Message = require('../classes/message');

const getMessages = async (req, res) => {

    //const myId = req.uid;
    const from = req.params.from;

    const last30 = await Message.find({
        $or: [{ to: from }]
    }).sort({ createdAt: 'desc' }).limit(30);

    res.json({
        ok: true,
        messages: last30
    });

};

const getLastMessage = async (req, res) => {

    const myId = req.uid;
    const from = req.params.from;

    const last = await Message.find({
        $or: [{ to: from }]
    }).sort({ createdAt: 'desc' }).limit(1);

    res.json({
        ok: true,
        from: from,
        myId: myId,
        messages: last
    });

};


module.exports = { getMessages, getLastMessage };