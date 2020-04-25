var socket = io();

socket.on('ticketsEnCurso', function (data) {
    console.log(data);
    if(!data.conexion) {
        console.log('reproducionendo audio');
        var audio = new Audio('audio/new-ticket.mp3')
        audio.play();
    }
    data.tickets.forEach((ticket, idx) => {
        let idxQuery = idx + 1;
        $('#lblTicket'+ idxQuery).text('Ticket: ' + ticket.numero);
        $('#lblEscritorio'+ idxQuery).text('Escritorio: ' + ticket.escritorio);
    })
})
