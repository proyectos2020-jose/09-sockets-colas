var socket = io();
let label = $('#lblNuevoTicket');

socket.on('connect', function()  {
    console.log('Servidor conectado');
    socket.on('ticketActual', function (ticket) {
        label.text(ticket.actual);
    })
})

socket.on('disconnect', function () {
    console.log('Servidor desconectado');
})

$('button').on('click', function () {
    socket.emit('siguienteTicket', function (ticket) {
        label.text(ticket);
    })
})
