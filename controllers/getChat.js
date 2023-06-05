const Message = require("../models/message");


const getChat = async ( req, res ) => {

    const myID = req.uid;
    const messagesFrom = req.params.from;

    const last30 = await Message.find({
        $or: [
            { from: myID, to: messagesFrom },
            { from: messagesFrom, to: myID }
        ]
    })
    .sort({ createdAt: 'desc'})
    .limit(30);

    res.json ({
        ok: true,
        messages: last30

    })

}

module.exports = {
    getChat
}