$(document).ready(
  function (){
    // Scelgo una data iniziale assegnandola a una variabile...
    var dataInizio = moment('01-01-2018','dd-mm-yyyy');
    //console.log(dataInizio);

    giorniMese();
    // scrivo una funzione...
    function giorniMese(){
      var source = document.getElementById("entry-template").innerHTML;
      var template = Handlebars.compile(source);
      /*
        ...che prenda la dataInizio, con un determinato format,
        aggiunga tutti i giorni del mese tramite il ciclo for,
        e li appenda alla ul .calendar
      */
      for (var i = 0; i <= 30; i++) {
        var giorno = dataInizio.format('dddd D');
        console.log(giorno);
        var stampa = {giorno};
        var html = template(stampa);
        dataInizio.add(1, 'day');
        $('.calendar').append(html);
      }
    }
  }
);
