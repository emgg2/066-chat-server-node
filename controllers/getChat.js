const Message = require("../models/message");


const getChat = async ( req, res ) => {

    const myID = req.uid;
    const messagesFrom = req.params.from;
    const projection = { _id:1, uid: "$_id", from:"$from", to: "$to", message:"$message", createdAt:"$createdAt", updatedAt:"$updatedAt"};
    const last30 = await Message.find({
        $or: [
            { from: myID, to: messagesFrom },
            { from: messagesFrom, to: myID }
        ]
    }, projection)
    .sort({ createdAt: 'asc'});
   

    res.json ({
        ok: true,
        messages: last30
    })

}

module.exports = {
    getChat
}