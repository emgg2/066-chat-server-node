const User = require('../models/user');
const Message = require('../models/message');

const connectUser = async ( uid ) =>{

    const user = await User.findById(uid);
    user.online = true;
    await user.save();
    return user;


}

const disconnectUser = async ( uid ) =>{
    const user = await User.findById(uid);
    user.online = false;
    await user.save();
    return user;

} 

const getUsers = async () => {
    const Users =  await User    
        .find()
        .sort('-online');

    return Users;
}

const saveMessage = async ( payload ) => {
    try {
        const message = new Message ( payload );
        await message.save();
        return message;

    } catch (error) {
        console.log(error.message);
        return false;
    }
}

module.exports = {
    connectUser,
    disconnectUser,
    getUsers,
    saveMessage

}