// Referencias del HTML
const buttonGenerate = document.querySelector('.btn-generate-ticket');
const labelTicket = document.querySelector('#lblNuevoTicket');

const socket = io();

socket.on('connect', () => {
    buttonGenerate.disabled = false;
});

socket.on('disconnect', () => {
    buttonGenerate.disabled = true;
});

socket.on('ultimo-ticket', (ultimo) => {
    labelTicket.innerText = `Ticket ${ultimo}`;
});

buttonGenerate.addEventListener('click', () => {
    socket.emit('siguiente-ticket', null, (ticket) => {
        labelTicket.innerText = ticket;
    });
});
