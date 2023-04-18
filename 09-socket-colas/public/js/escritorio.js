const titulo = document.getElementById('escritorio-titulo');
const ticketAtendido = document.getElementById('ticket-atendido');
const buttonAtender = document.getElementById('btn-atender');
const ticketsAlert = document.getElementById('tickets-cola-alert');
const ticketsPendientes = document.getElementById('lblPendientes');

const searchParams = new URLSearchParams(window.location.search);

if(!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es obligatorio');
};

const escritorio = searchParams.get('escritorio');
titulo.innerText = escritorio;

const socket = io();

socket.on('connect', () => {
    buttonAtender.disabled = false;
});

ticketsAlert.style.display = 'none';

socket.on('disconnect', () => {
    buttonAtender.disabled = true;
});

socket.on('tickets-pendientes', (pendientes) => {
    if(pendientes === 0){
        ticketsPendientes.style.display = 'none';
    } else {
        ticketsPendientes.style.display = '';
        ticketsPendientes.innerText = pendientes;
    }
});

buttonAtender.addEventListener('click', () => {
    socket.emit('atender-ticket', { escritorio }, ({ ok, ticket, msg }) => {
        if(!ok) {
            ticketAtendido.innerText = `nadie`;
            return ticketsAlert.style.display = '';
        };
        
        ticketAtendido.innerText = `Ticket ${ticket.numero}`;
    });
});