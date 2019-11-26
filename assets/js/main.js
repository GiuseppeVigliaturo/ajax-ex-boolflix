var moviesearch;
var starpiene;
var starvuote;
var voto;
$(".btnsearch").click(function(){

  $(".content").html(" ");
  //al click sul bottone prendo il valore dell'input e lo salvo in una variabile
  moviesearch= $(".inputmovie").val();
  console.log(moviesearch);

  chiamatapi(moviesearch);
  //dopo aver effetuato la chiamatapi ripulisco la searchbar
  $(".inputmovie").val(" ");
});

  //FUNZIONI

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
            // starpiene = stellinepiene(voto);
            // starvuote = stellinevuote(voto);

          },

          error : function (errore) {
               alert("E' avvenuto un errore. "+errore);
             }
           }); //fine funzione ajax
  }

  function print(item) {


      console.log(item.title);
      var titolofilm = item.title;
      console.log(item.original_title);
      var orgtitolo = item.original_title;
       console.log(item.original_language);
      var orglingua = item.original_language;
      console.log(item.vote_average);
      voto = parseInt(item.vote_average * 0.5);
       starpiene = stellinepiene(voto);
       starvuote = stellinevuote(voto);


      var source = document.getElementById("entry-template").innerHTML;
      var template = Handlebars.compile(source);

      var context = { titolo:"Titolo: "+titolofilm ,
                     originale_titolo:"Originale: "+orgtitolo,
                     originale_lingua:"Lingua: "+orglingua,
                     votomedio:"voto: " + starpiene + starvuote
                    };
      var html = template(context);

      $(".content").append('<div class="item">'+ html +'</div>');

  }



//stampo tante stelline quanto è il voto
function stellinepiene(voto){
  for (var i = 0; i < voto; i++) {
    console.log(i);
    $(".voto").append('<i class="fas fa-star">'+ '</i>');
  }
}

//stampo tante stelline vuote fino ad arrivare a 5
function stellinevuote(voto){
  for (var i = 0; i < (5 - voto); i++) {
    console.log(i);
    $(".voto").append('<i class="far fa-star">'+ '</i>');
  }
}
