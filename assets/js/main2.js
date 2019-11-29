var moviesearch, serietv,search,starpiene,starvuote,voto,info;

$(".btnsearch").click(function(){
//ad ogni click ripulisco lo schermo
  $(".contentserie").html(" ");
  $(".contentfilm").html(" ");
  //al click sul bottone prendo il valore dell'input e lo salvo in una variabile
  search= $(".inputmovie").val();
  console.log(moviesearch);
  // per poter avere un'unica funzione tratto l'url come un parametro il cui valore assegno ad una variabile
  var urltv = "https://api.themoviedb.org/3/search/tv";
  var urlfilm = "https://api.themoviedb.org/3/search/movie";

//effettuo la chiamata all'api
  chiamatapi(search,urlfilm,"movie");
  chiamatapi(search,urltv,"tv");
  //dopo aver effetuato la chiamatapi ripulisco la searchbar
  search = $(".inputmovie").val(" ");
});

  //FUNZIONI


function chiamatapi(richiesta,url,type)
  {
    $.ajax({

          url : url,
          data:{
            api_key:"510cf020dbf7095ebfbc5325b6590d69",
            language:"it_IT",
            query:richiesta
          },
          method : "GET",
          success : function (data,stato) {
            //salvo il contenuto relativo alla serietv in una variabile
            var store = data.results;
            console.log(store);
            console.log(stato);

            //con un ciclo attraverso il contenuto della variabile contenente
            //le info del film e stampo ciò che mi serve

            for (var i = 0; i < store.length; i++) {
              print(store[i],type);
            }


          },

          error : function (errore) {
               alert("E' avvenuto un errore. "+errore);
             }
           }); //fine funzione ajax
  }

//funzione che prende i dati dall'array e li stampa nelle rispettive card

  function print(item,type) {

    var titolofilm = (type == "movie" ? item.title : item.name);
		var orgtitolo = (type == "movie" ? item.original_title : item.original_name);

      if (item.poster_path) {
        var locandina = item.poster_path;
      }


       console.log(item.original_language);
      var orglingua = item.original_language;
      var bandiera = flagFunction(orglingua);
      console.log(item.vote_average);
      info = item.overview;

      voto = parseInt(item.vote_average * 0.5);
       star = stelle(voto);



      var source = document.getElementById("entry-template").innerHTML;
      var template = Handlebars.compile(source);

      var context = {
                    copertina: "https://image.tmdb.org/t/p/w342"+locandina,
                    titolo:"Titolo: "+titolofilm ,
                     originale_titolo:"Originale: "+orgtitolo,
                     originale_lingua: bandiera,
                     trama: info,
                     votomedio:"voto: " ,
                     stariconp: star

                    };
      var html = template(context);

      //a seconda del type specificato faccio stampare la card nel contenitore corrispondente

      if (type =="movie") {
        $(".contentfilm").append('<div class="item">'+ html +'</div>');
      }
      else {
        $(".contentserie").append('<div class="item">'+ html +'</div>');
      }

  }

//stampo tante stelline quanto è il voto
function stelle(voto){
  var star = "";
  for (var i = 0; i < 5; i++) {
    //dovrei andare a valorizzare nel for di volta in volta una variabile e poi fuori
    // dal for farmela restituire cosi da sovrascriverla ogni volta e quindi
    //alla fine stampare il numero di stelle corretto
    star += i <= voto ? '<i class="fas fa-star"></i>' : '<i class="far fa-star"></i>';
    //operatore ternario, 1.condizione 2.se 1 vero allora fai questo 3.se 1 falso allora fai questo

  }
  return star;
}


//rimpiazzo la lingua con la bandiera del paese corrispondente
function flagFunction(orglingua){

  var flag ="";
  var listalingue = ["en","fr","ja","it","es","cn"];
  if (listalingue.includes(orglingua)) {
      flag = "assets/img/"+ orglingua +".png";
  }
  return flag;
}
