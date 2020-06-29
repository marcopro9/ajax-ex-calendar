$(document).ready(
  function (){
    // Scelgo una data iniziale assegnandola a una variabile...
    var dataInizio = moment('2018-01-01','YYYY-MM-DD');
    //console.log(dataInizio);

    giorniMese();

    // faccio la chiamata ajax...
    $.ajax({
      url: "https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0",
      method: "GET",
      success: function (data, stato) {
        var festivita = data.response;

        for (var key in festivita) {
          var giornoRosso = festivita[key];
          console.log(giornoRosso.date);
          if (giornoRosso.date === dataInizio._i) {
            $('.giorno').addClass('rosso');
          } else {
            $('.giorno').addClass('nero');
          }
          // console.log(festivita[key]);
        }
      },
      error: function (richiesta, stato, errori) {
        alert("Errore");
      }
    });

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
        var giorno = dataInizio.format('D dddd');
        var stampa = {giorno};
        var html = template(stampa);
        dataInizio.add(1, 'day');
        // stampo tramite handlebars
        $('.calendar').append(html);
      }
    }
  }
);
