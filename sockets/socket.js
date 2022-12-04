const { checkJWT } = require('../helpers/jwt');
const { io } = require('../index');
const { userOffline, userOnline, roomOffline, roomOnline, saveMessage } = require('../controllers/socket');


// Mensajes de Sockets
io.on('connection', client => {
    
    const [valid, uid] = checkJWT(client.handshake.headers['x-token']);
    
    // Verifico si el usuario es válido
    if (!valid) {
        return client.disconnect();
    }

    // Cliente autenticado
    userOnline(uid);
    roomOnline(uid);

    // Ingresar usuario a una sala
    //client.join(uid);

    client.on('user-connect', (payload) => {
        console.log('CONECTADO!');

        if (payload.type == 'Normal') {
            for (let i = 0; i < payload.rooms.length; i++) {
                client.join(payload.rooms[i]);
            }
        } else {
            client.join(payload.myRoom);
        }

        io.sockets.emit('user-connect', payload.uid);
    });

    client.on('user-disconnect', (payload) => {
        console.log('DESCONECTADO!');
        io.sockets.emit('user-disconnect', payload.uid);
    });

    client.on('message-personal', async (payload) => {
        await saveMessage(payload);
        io.to(payload.to).emit('message-personal', payload);
    });


    client.on('disconnect', () => {
        userOffline(uid);
        roomOffline(uid);
        console.log('Cliente desconectado: ' + uid);
    });

});
