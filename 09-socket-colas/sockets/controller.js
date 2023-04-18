const TicketControl = require('../models/ticket-control');
const ticketControl = new TicketControl();

const socketController = (socket) => {

    // Cuando un cliente se conecta / When a client connects
    socket.emit('ultimo-ticket',  ticketControl.ultimo);
    socket.emit('estado-actual', ticketControl.ultimos4);
    socket.emit('tickets-pendientes', ticketControl.tickets.length);

    socket.on('siguiente-ticket', ( payload, callback ) => {
        const siguiente = ticketControl.siguiente();
        callback(siguiente);
        socket.broadcast.emit('tickets-pendientes', ticketControl.tickets.length);
    
        // TODO: Notify that there is a new pending ticket to assign
    });

    socket.on('atender-ticket', ({ escritorio }, callback) => {
        if(!escritorio) {
            return callback({
                ok: false,
                msg: 'El escritorio es obligatorio'
            });
        };

        const ticket = ticketControl.atenderTicket(escritorio);


        // TODO: Notificate cambio en los ultimos4
        socket.broadcast.emit('estado-actual', ticketControl.ultimos4);
        socket.emit('tickets-pendientes', ticketControl.tickets.length);
        socket.broadcast.emit('tickets-pendientes', ticketControl.tickets.length);

        if(!ticket) {
            callback({
                ok: false,
                msg: 'Ya no hay tickets pendientes'
            });
        } else {
            callback({
                ok: true,
                ticket
            });
        };
    });

}

module.exports = { 
    socketController
}

