let usuario = null;
let socket = null;

// Referencias HTML
const txtUid = document.getElementById('txtUid');
const txtMensaje = document.getElementById('txtMensaje');
const ulUsuarios = document.getElementById('ulUsuarios');
const ulMensajes = document.getElementById('ulMensajes');
const btnSalir = document.getElementById('btnSalir');

const validarJWT = async () => {
    const token = localStorage.getItem('token') || '';

    if(token.length <= 10) {
        window.location = 'index.html';
        throw new Error('No hay token en el servidor');
    };

    try {
        const request = await fetch('http://localhost:8080/api/auth', {
            headers: { 'x-token': token }
        });
        
        const response = await request.json();
        localStorage.setItem('token', response.token);
        usuario = response.usuario;
        document.title = usuario.nombre;

        await conectarSocket();
        
    } catch (error) {
        console.log(error);
        window.location = 'index.html';
    }
};

const conectarSocket = () => {
    socket = io({
        'extraHeaders': {
            'x-token': localStorage.getItem('token')
        }
    });

    socket.on('connect', () => {
        console.log('Sockets online');
    });

    socket.on('disconnect', () => {
        console.log('Sockets offlineS');
    });

    socket.on('recibir-mensajes', dibujarMensajes);

    socket.on('usuarios-activos', (payload) => {
        // TODO:
        dibujarUsuario(payload);

    });

    socket.on('mensaje-privado', (payload) => {
        // TODO:
        console.log('Privador:', payload);
    });

};

const dibujarUsuario = (usuarios = []) => {
    let usersHtml = '';

    usuarios.forEach(({nombre, uid}) => {
        usersHtml += `
            <li>
                <p>
                    <h5 class='text-success'>${nombre}</h5>
                    <span class='fs-6 text-muted'>${uid}</span>
                </p>
            </li>
        `
    });

    ulUsuarios.innerHTML = usersHtml;
};

const dibujarMensajes = (mensajes = []) => {
    let mensajesHTML = '';

    mensajes.forEach(({nombre, mensaje}) => {
        mensajesHTML += `
            <li>
                <p>
                    <span class='text-primary'>${nombre}</span>
                    <span>${mensaje}</span>
                </p>
            </li>
        `
    });

    ulMensajes.innerHTML = mensajesHTML;
};


txtMensaje.addEventListener('keyup', ({ keyCode }) => {

    const mensaje = txtMensaje.value;
    const uid = txtUid.value;

    if(keyCode !== 13) {return};
    if(mensaje.length === 0) {return};

    socket.emit('enviar-mensaje', { mensaje, uid });

    txtMensaje.value = '';

});

const main = async () => {

    // Validar JWT
    await validarJWT();

};

main();
