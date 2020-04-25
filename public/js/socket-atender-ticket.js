var socket = io();

var urlParams = new URLSearchParams(window.location.search);
console.log(urlParams.get('escritorio'));
if(!urlParams.has('escritorio')) {
    console.log('Se debe de enviar el escritorio')
    throw new Error('Es necesario enviar el escritorio');
}

$('button').on('click', function () {
    socket.emit('atenderTicket', {escritorio: urlParams.get('escritorio')}, function (res) {
        if (res === 'No hay más tickets') {
            alert(res);
            $('small').text(res);
        } else {
            $('small').text(res.numero);
            $('h1').text('Escritorio ' + urlParams.get('escritorio'));
        }
    })
})

/*$('button').on('click', function () {
    $('.form-control').text()
    /!*socket.emit('atenderTicket', {escritorio: },function (ticket) {
        console.log(ticket)
    })*!/
})*/
