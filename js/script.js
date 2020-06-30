$(document).ready(
  function (){
    // Scelgo una data iniziale assegnandola a una variabile
    var dataInizio = moment({
      day: 1,
      month: 0,
      year: 2018
    });

    //chiamo le funzioni
    stampaMesi(dataInizio);
    stampaFeste(dataInizio);

    // al click sul pulsante "successivo"...
    $('.successivo').click(function(){
      // ...prendo il mese corrente...
      var meseCorrente = $('.mese').attr('data-mese');
      var momentMeseCorrente = moment(meseCorrente);
      // ...e aggiungo un mese.
      var meseSuccessivo = momentMeseCorrente.add(1,'months');

      // Se il prossimo mese rientra nel 2018 stampa i giorni con le festività...
      if (meseSuccessivo.year() === 2018) {
        stampaMesi(meseSuccessivo);
        stampaFeste(meseSuccessivo);
        // ....altrimenti da un messaggio di alert
      } else {
        alert('Solo anno 2018');
      }
    });

    // al click sul pulsante "precedente"...
    $('.precedente').click(function(){
      // ...prendo il mese corrente...
      var meseCorrente = $('.mese').attr('data-mese');
      var momentMeseCorrente = moment(meseCorrente);
      // ...e sottraggo un mese.
      var mesePrecedente = momentMeseCorrente.subtract(1,'months');
      // Se il mese precedente rientra nel 2018 stampa i giorni con le festività...
      if (mesePrecedente.year() === 2018) {
        stampaMesi(mesePrecedente);
        stampaFeste(mesePrecedente);
        // ....altrimenti da un messaggio di alert
      } else {
        alert('Solo anno 2018');
      }
    });

    // scrivo una funzione che stampa i giorni dei mesi
    function stampaMesi(dataInizio){
      // libera la ul calendario
      $('.calendario').html('');
      // h1 arricchito con nome del mese
      $('.mese').text(dataInizio.format('MMMM YYYY'));
      // l'attributo di mese arricchito con la data
      $('.mese').attr('data-mese', dataInizio.format('YYYY-MM-DD'));
      // calcola i giorni nel mese
      var numeroGiorni = dataInizio.daysInMonth();
      // gestione stampa di handlebars
      var source = $("#entry-template").html();
      var template = Handlebars.compile(source);
      // ciclo for per stampare ogni giorno del mese
      for (var i = 1; i <= numeroGiorni; i++) {
        var giorno = moment({
          day: i,
          month: dataInizio.month(),
          year: dataInizio.year()
        });
        // gestione stampa nel template con handlebars
        var context = {
          giorno: giorno.format('D dddd'),
          data: giorno.format('YYYY-MM-DD'),
        };
        var html = template(context);
        // attacco il giorno alla lista "calendario"
        $('.calendario').append(html);
      }
    }

    // scrivo una funzione per stampare le feste
    function stampaFeste(dataInizio){
      // chiamata ajax per l'api holidays di boolean
      $.ajax({
        url: "https://flynn.boolean.careers/exercises/api/holidays",
        method: "GET",
        data: {
          year: dataInizio.year(),
          month: dataInizio.month(),
        },
        success: function (dataResponse) {
          var festivita = dataResponse.response;
          // se i dati dell'api danno come booleano true....
          if (dataResponse.success === true) {
            // parte un ciclo for e per ogni festività aggiungo
            // classe rosso e il nome della festa al giorno corrispondente
            for (var i = 0; i < festivita.length; i++) {
              var giornoRosso = festivita[i];
              var festa = $('.giorno[data-giorno="'+ giornoRosso.date +'"]');
              festa.addClass('rosso');
              festa.append(' - ' + giornoRosso.name);
            }
          }
        },
        error: function (richiesta, stato, errori) {
          alert("Errore");
        }
      });
    }
  }
);
