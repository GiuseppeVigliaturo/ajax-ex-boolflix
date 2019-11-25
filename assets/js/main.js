var moviesearch;
$(".btnsearch").click(function(){
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
            store.forEach(myFunction);

          },

          error : function (errore) {
               alert("E' avvenuto un errore. "+errore);
             }
           }); //fine funzione ajax
  }

  function myFunction(item) {


      console.log(item.title);
      var titolofilm = item.title;
      console.log(item.original_title);
      var orgtitolo = item.original_title;
       console.log(item.original_language);
      var orglingua = item.original_language;
      console.log(item.vote_average);
      var voto = item.vote_average;

      var source = document.getElementById("entry-template").innerHTML;
      var template = Handlebars.compile(source);

      var context = { titolo:"Titolo: "+titolofilm ,
                     originale_titolo:"Originale: "+orgtitolo,
                     originale_lingua:"Lingua: "+orglingua,
                     votomedio:"voto: "+voto };
      var html = template(context);

        // $(".content").append(html);

      $(".content").append('<div class="item">'+ html +'</div>');

  }
