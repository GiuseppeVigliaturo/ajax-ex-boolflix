var moviesearch, serietv,starpiene,starvuote,voto;

$(".btnsearch").click(function(){

  $(".contentserie").html(" ");
  $(".contentfilm").html(" ");
  //al click sul bottone prendo il valore dell'input e lo salvo in una variabile
  moviesearch= $(".inputmovie").val();
  console.log(moviesearch);
  serietv= $(".inputmovie").val();

  chiamatapi(moviesearch);
  chiamatapiserietv(serietv);
  //dopo aver effetuato la chiamatapi ripulisco la searchbar
moviesearch= $(".inputmovie").val(" ");
serietv= $(".inputmovie").val(" ");
});

  //FUNZIONI


function chiamatapiserietv(film)
  {
    $.ajax({

          url : "https://api.themoviedb.org/3/search/tv?api_key=510cf020dbf7095ebfbc5325b6590d69&language=it_IT&query="+ film,
          method : "GET",
          success : function (data,stato) {
            //salvo il contenuto relativo alla serietv in una variabile
            var store = data.results;
            console.log(store);
            console.log(stato);

            //con un ciclo attraverso il contenuto della variabile contenente
            //le info del film e stampo ciò che mi serve
            store.forEach(printserietv);
            //con il foreach come parametro la funzione prende ciò che è prima del punto

          },

          error : function (errore) {
               alert("E' avvenuto un errore. "+errore);
             }
           }); //fine funzione ajax
  }


function chiamatapi(film)
  {
    $.ajax({

          url : "https://api.themoviedb.org/3/search/movie?api_key=510cf020dbf7095ebfbc5325b6590d69&query=" + film,
          method : "GET",
          success : function (data,stato) {
            //salvo il contenuto relativo al film in una variabile
            var store = data.results;
            console.log(store);
            console.log(stato);

            //con un ciclo attraverso il contenuto della variabile contenente
            //le info del film e stampo ciò che mi serve
            store.forEach(print);
            //con il foreach come parametro la funzione prende ciò che è prima del punto

          },

          error : function (errore) {
               alert("E' avvenuto un errore. "+errore);
             }
           }); //fine funzione ajax
  }

  function print(item) {

    // if (type == "movie") {
    //
    // }
    // else

      var locandina = item.poster_path;
      console.log(item.title);
      var titolofilm = item.title;
      console.log(item.original_title);
      var orgtitolo = item.original_title;
       console.log(item.original_language);
      var orglingua = item.original_language;
      var bandiera = flagFunction(orglingua);
      console.log(item.vote_average);
      voto = parseInt(item.vote_average * 0.5);
       starpiene = stellinepiene(voto);
       starvuote = stellinevuote(voto);


      var source = document.getElementById("entry-template").innerHTML;
      var template = Handlebars.compile(source);

      var context = {
                    copertina: "https://image.tmdb.org/t/p/w185"+locandina,
                    titolo:"Titolo: "+titolofilm ,
                     originale_titolo:"Originale: "+orgtitolo,
                     originale_lingua: bandiera,
                     votomedio:"voto: " ,
                     stariconp: starpiene,
                     stariconv: starvuote
                    };
      var html = template(context);

      $(".contentfilm").append('<div class="item">'+ html +'</div>');


  }

  function printserietv(item) {

      var locandina = item.poster_path;
      var nome = item.name;
      var orgtitolo = item.original_name;
       console.log(item.original_language);
      var orglingua = item.original_language;
      var bandiera = flagFunction(orglingua);
      console.log(item.vote_average);
      voto = parseInt(item.vote_average * 0.5);
       starpiene = stellinepiene(voto);
       starvuote = stellinevuote(voto);


      var source = document.getElementById("entry-template").innerHTML;
      var template = Handlebars.compile(source);

      var context = {
                    copertina: "https://image.tmdb.org/t/p/w185"+locandina,
                    titolo: "Titolo "+ nome,
                     originale_titolo:"Originale: "+orgtitolo,
                     originale_lingua: bandiera,
                     votomedio:"voto: " ,
                     stariconp: starpiene,
                     stariconv: starvuote
                    };
      var html = template(context);

      $(".contentserie").append('<div class="item">'+ html +'</div>');

  }



//stampo tante stelline quanto è il voto
function stellinepiene(voto){
  var starfull = "";
  for (var i = 0; i < voto; i++) {
    //dovrei andare a valorizzare nel for di volta in volta una variabile e poi fuori
    // dal for farmela restituire cosi da sovrascriverla ogni volta e quindi
    //alla fine stampare il numero di stelle corretto
    starfull += '<i class="fas fa-star"></i>';
  }
  return starfull;
}

//stampo tante stelline vuote fino ad arrivare a 5
function stellinevuote(voto){
  var starempty = "";

  for (var j = 0; j < (5 - voto); j++) {
    console.log(j);
    starempty += '<i class="far fa-star"></i>';
  }
    return starempty

}

//rimpiazzo la lingua con la bandiera del paese corrispondente
function flagFunction(orglingua){
// var flag = '';
//   switch(orglingua) {
//     case "en":
//       flag= "assets/img/uk.png";
//       break;
//     case "fr":
//       flag= "assets/img/fr.png";
//       break;
//     case "jp":
//       flag= "assets/img/jp.png";
//       break;
//      case "it":
//       flag= "assets/img/it.png";
//       break;
//     default:
//       flag ="bandiera";
//   }
//   return flag;
  //oppure uso un array
  var flag ="";
  var listalingue = ["en","fr","ja","it","es","cn"];
  if (listalingue.includes(orglingua)) {
      flag = "assets/img/"+ orglingua +".png";
  }
  return flag;
}
