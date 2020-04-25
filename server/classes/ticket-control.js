const fs = require('fs');
const path = require('path')

class Ticket {

    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class TicketControl {

    constructor() {
        this.tickets = [];
        this.ultimos4 = [];
        this.ultimo = 0;
        this.hoy = new Date().getDate();

        let data = require('../data/data.json');

        if(data.hoy === this.hoy) {
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;
            this.ultimo = data.ultimo;
        } else {
            this.reiniciarConteo();
        }
    }

    siguienteTicket() {
        this.ultimo ++;
        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket)
        this.grabarDatos();
        return `Ticket generado: ${this.ultimo}`;
    }

    getUltimoTicket(){
        return `Ticket generado: ${this.ultimo}`;
    }

    getUltimos4(){
        return this.ultimos4;
    }

    reiniciarConteo() {
        this.grabarDatos();
    }

    atenderTicket(escritorio) {
        if( this.tickets.length === 0) {
            return 'No hay más tickets';
        }

        let primerTicket = this.tickets[0];
        let numeroTicket = primerTicket.numero;
        let ticket = new Ticket(numeroTicket, escritorio);

        //Si hay 4 tickets o más, entonces tenemos que quitar uno.
        if(this.ultimos4.length  >= 4){
            this.ultimos4.splice(-1, 1);
        }

        //Quitamos el primer elemento de los tickets pendientes
        this.tickets.shift();
        //Creamos un nuevo ticket al inicio del array
        this.ultimos4.unshift(ticket)
        //Grabamos los datos en el fichero .json
        this.grabarDatos();

        return ticket;

    }

    grabarDatos(){
        let jsonData = {
            hoy: this.hoy,
            ultimo: this.ultimo,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        }
        let stringJsonData = JSON.stringify(jsonData)
        let filePath = path.resolve(__dirname, '../data/data.json');
        fs.writeFileSync(filePath, stringJsonData);
    }
}

module.exports = { TicketControl}
