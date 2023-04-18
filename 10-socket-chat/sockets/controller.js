const { comprobarJWT } = require("../helpers");
const { ChatMensajes } = require('../models');

const chatMensajes = new ChatMensajes();

const socketController = async (socket, io) => {
    const usuario = await comprobarJWT(socket.handshake.headers['x-token']);

    if(!usuario) {
        return socket.disconnect();
    }

    // Agreagar el usuario conectado
    chatMensajes.conectarUsuario(usuario);
    io.emit('usuarios-activos', chatMensajes.usuarioArr);
    socket.emit('recibir-mensajes', chatMensajes.ultimos10);

    // Conectarlo a una sala especial
    socket.join(usuario.id); // global, socket.id, usuario.id

    // Limpiar usuarios cuando un usuario se desconecta
    socket.on('disconnect', () => {
        chatMensajes.desconectarUsuario(usuario.id);
        io.emit('usuarios-activos', chatMensajes.usuarioArr);
    });

    socket.on('enviar-mensaje', ({ uid, mensaje }) => {
        if(uid) {
            socket.to(uid).emit('mensaje-privado', {de: usuario.nombre, mensaje});
        } else {
            chatMensajes.enviarMensajes(usuario.id, usuario.nombre, mensaje);
            io.emit('recibir-mensajes', chatMensajes.ultimos10);
        }
    });
};

module.exports = {
    socketController
};