$(document).ready(
  function (){

    arrayGiorniPerMese();
    function arrayGiorniPerMese() {
      var source = document.getElementById("entry-template").innerHTML;
      var template = Handlebars.compile(source);
      var giorniDelMese = moment().daysInMonth();
      var arrayGiorni = [];


      while(giorniDelMese) {
        var inizio = moment().date(giorniDelMese);
        arrayGiorni.push(inizio);
        arrayGiorni.reverse();
        giorniDelMese--;
      }
      for (var i = 0; i < arrayGiorni.length; i++) {
        var singoloGiorno = arrayGiorni[i];
        singoloGiorno = singoloGiorno.format('dddd D');
        var html = template(singoloGiorno);
        console.log(singoloGiorno);
        $('.calendar').append(html);
      }

      return arrayGiorni;
    }
  }
);
