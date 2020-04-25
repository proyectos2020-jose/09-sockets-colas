const { io } = require('../server');
const {TicketControl } = require('../classes/ticket-control');
let ticket = new TicketControl();


io.on('connection', (client) => {

    client.emit('ticketsEnCurso', {conexion: true, tickets: ticket.getUltimos4()});

    client.on('atenderTicket',(data, callback)=> {
        callback(ticket.atenderTicket(data.escritorio));
        client.broadcast.emit('ticketsEnCurso', {conexion: false, tickets: ticket.getUltimos4()});
    })

    client.emit('ticketActual', { actual: ticket.getUltimoTicket()});

    client.emit('enviarMensaje', {
        usuario: 'Administrador',
        mensaje: 'Bienvenido a esta aplicación'
    });

/*    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });*/

    // Escuchar el cliente
    client.on('enviarMensaje', (data, callback) => {

        console.log(data);

        client.broadcast.emit('enviarMensaje', data);


        // if (mensaje.usuario) {
        //     callback({
        //         resp: 'TODO SALIO BIEN!'
        //     });

        // } else {
        //     callback({
        //         resp: 'TODO SALIO MAL!!!!!!!!'
        //     });
        // }



    });

    client.on('siguienteTicket', (callback) => {
        callback(ticket.siguienteTicket());
    })

/*    client.on('atenderTicket', function (escritorio) {
        this.ticket.atenderTicket(escritorio)
    })*/
});
