const { connectUser, disconnectUser, getUsers, saveMessage } = require("../controllers/sockets");
const { checkJWT } = require("../helpers/jwt");


class Sockets {

    constructor( io ) {

        this.io = io;

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', async ( socket ) => {

          const [ valido, uid ] =  checkJWT(socket.handshake.query['x-token']);

          if (!valido) {
              console.log('Unidentifed JWT');
              return socket.disconnect();
          }  else {
            console.log('Cliente conectado', uid);
          }
        
          await connectUser(uid);


          // Join user to a chat room  socket.io
          socket.join( uid ); 

          
          // si hago socket.join('sala-gamer');
          // this.io.to('sala-gamer').emit(''); Emito a todos los usuarios que están en las sala-gamer

          this.io.emit('users-list', await getUsers());

          socket.on('personal-message', async ( payload )=> {
            const message = await saveMessage( payload );            
            this.io.to( payload.to ).emit( 'personal-message', message);
            this.io.to( payload.from ).emit( 'personal-message', message);
          })
                  
      

          // TODO: Disconnect
          // Marcar en la bbdd de el usuario se desconectó
          // TODO: emitir todos los usuarios conectados

          socket.on('disconnect', async() => {
              await disconnectUser( uid );            
              this.io.emit('users-list', await getUsers());
              console.log('cliente desconectado',uid);
        })
        
        });
    }


}


module.exports = Sockets;