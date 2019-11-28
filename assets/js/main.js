var moviesearch, serietv,starpiene,starvuote,voto;

$(".btnsearch").click(function(){

  $(".contentserie").html(" ");
  $(".contentfilm").html(" ");
  //al click sul bottone prendo il valore dell'input e lo salvo in una variabile
  moviesearch= $(".inputmovie").val();
  console.log(moviesearch);
  serietv= $(".inputmovie").val();
  var urltv = "https://api.themoviedb.org/3/search/tv";
  var urlfilm = "https://api.themoviedb.org/3/search/movie";

  chiamatapi(moviesearch,urlfilm,"movie");
  chiamatapi(serietv,urltv,"tv");
  //dopo aver effetuato la chiamatapi ripulisco la searchbar
  moviesearch= $(".inputmovie").val(" ");
  serietv= $(".inputmovie").val(" ");
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
            // store.forEach(printserietv);
            store.forEach(print(store,type));

            //con il foreach come parametro la funzione prende ciò che è prima del punto

          },

          error : function (errore) {
               alert("E' avvenuto un errore. "+errore);
             }
           }); //fine funzione ajax
  }


// function chiamatapi(richiesta,url,type)
//   {
//     $.ajax({
//
//           url : url,
//           data:{
//             api_key:"510cf020dbf7095ebfbc5325b6590d69",
//             language:"it_IT",
//             query:richiesta
//           },
//           method : "GET",
//           success : function (data,stato) {
//             //salvo il contenuto relativo al film in una variabile
//             var store = data.results;
//             console.log(store);
//             console.log(stato);
//
//             //con un ciclo attraverso il contenuto della variabile contenente
//             //le info del film e stampo ciò che mi serve
//             // store.forEach(print);
//             for (var i = 0; i < store.length; i++) {
//               print(store[i],type);
//             }
//             //con il foreach come parametro la funzione prende ciò che è prima del punto
//
//           },
//
//           error : function (errore) {
//                alert("E' avvenuto un errore. "+errore);
//              }
//            }); //fine funzione ajax
//   }

  function print(item,type) {

    var titolofilm = (type == "movie" ? item.title : item.name);
		var orgtitolo = (type == "movie" ? item.original_title : item.original_name);


      var locandina = item.poster_path;

       console.log(item.original_language);
      var orglingua = item.original_language;
      var bandiera = flagFunction(orglingua);
      console.log(item.vote_average);
      voto = parseInt(item.vote_average * 0.5);
       star = stelle(voto);



      var source = document.getElementById("entry-template").innerHTML;
      var template = Handlebars.compile(source);

      var context = {
                    copertina: "https://image.tmdb.org/t/p/w342"+locandina,
                    titolo:"Titolo: "+titolofilm ,
                     originale_titolo:"Originale: "+orgtitolo,
                     originale_lingua: bandiera,
                     votomedio:"voto: " ,
                     stariconp: star

                    };
      var html = template(context);

      if (type =="movie") {
        $(".contentfilm").append('<div class="item">'+ html +'</div>');
      }
      else {
        $(".contentserie").append('<div class="item">'+ html +'</div>');
      }

  }

  // function printserietv(item,type) {
  //
  //   var titolofilm = (type == "movie" ? item.title : item.name);
	// 	var orgtitolo = (type == "movie" ? item.original_title : item.original_name);
  //
  //     var locandina = item.poster_path;
  //
  //     var orglingua = item.original_language;
  //     var bandiera = flagFunction(orglingua);
  //     console.log(item.vote_average);
  //     voto = parseInt(item.vote_average * 0.5);
  //      star = stelle(voto);
  //
  //
  //
  //     var source = document.getElementById("entry-template").innerHTML;
  //     var template = Handlebars.compile(source);
  //
  //     var context = {
  //                   copertina: "https://image.tmdb.org/t/p/w342"+locandina,
  //                   titolo: "Titolo "+ titolofilm,
  //                    originale_titolo:"Originale: "+orgtitolo,
  //                    originale_lingua: bandiera,
  //                    votomedio:"voto: " ,
  //                    stariconp: star
  //                   };
  //     var html = template(context);
  //
  //
  //     $(".contentserie").append('<div class="item">'+ html +'</div>');
  //
  // }



//stampo tante stelline quanto è il voto
function stelle(voto){
  var star = "";
  for (var i = 0; i < 5; i++) {
    //dovrei andare a valorizzare nel for di volta in volta una variabile e poi fuori
    // dal for farmela restituire cosi da sovrascriverla ogni volta e quindi
    //alla fine stampare il numero di stelle corretto
    star += i <= voto ? '<i class="fas fa-star"></i>' : '<i class="far fa-star"></i>';

  }
  return star;
}



// //stampo tante stelline vuote fino ad arrivare a 5
// function stellinevuote(voto){
//   var starempty = "";
//
//   for (var j = 0; j < (5 - voto); j++) {
//     console.log(j);
//     starempty += '<i class="far fa-star"></i>';
//   }
//     return starempty
//
// }

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
