class Mensaje {
    constructor(uid, nombre, mensaje) {
        this.uid = uid;
        this.nombre = nombre;
        this.mensaje = mensaje;
    };
};

class ChatMensajes {
    constructor() {
        this.mensajes = [];
        this.usuarios = {};
    };

    get ultimos10() {
        return this.mensajes = this.mensajes.splice(0, 10);
    };

    get usuarioArr() {
        return Object.values(this.usuarios);
    };

    enviarMensajes(id, nombre, mensaje) {
        const newMessage = new Mensaje(id, nombre, mensaje);
        this.mensajes.unshift(newMessage);
    };

    conectarUsuario(usuario) {
        this.usuarios[usuario.id] = usuario;
    };

    desconectarUsuario(id) {
        delete this.usuarios[id];
    };
};

module.exports = ChatMensajes;