$(document).ready(function(){

    var movies = ["batman"];

    function renderButtons(){ 
        $('#buttonsView').empty();

        for (var i = 0; i < movies.length; i++){
            var a = $('<button>')
            a.addClass('movie');
            a.attr('data-name', movies[i]);
            a.text(movies[i]);
            $('#buttonsView').append(a);
        }
    }

    function displayMovieInfo(){
        // empty the movieView div to add new ones
         $('#moviesView').empty();

        var movie = $(this).attr('data-name');
        var queryURL = "http://api.giphy.com/v1/gifs/search?q="+movie+"&api_key=dc6zaTOxFJmzC&limit=10";
        var DisplayedGif=[];

        $.ajax({url: queryURL, method: 'GET'}).done(function(response) {

            gifArray = (response.data);
         
         for (var i = 0; i < gifArray.length; i++) {
            var showGif = $('<img>')
            showGif.attr({"data-trivia": i, "data-status": 0});
            // showGif.attr("data-trivia",i);
            showGif.attr("src",gifArray[i].images.original_still.url).addClass("gifImage");
            DisplayedGif.push(response.data);
            $("#moviesView").append(showGif);
         };
    });
    }

    $('#addMovie').on('click', function(){

        var movie = $('#movie-input').val().trim();
        movies.push(movie);
        renderButtons();
        return false;
    });
    
    function playGif(){
        if (($(this).attr('data-status'))==0) {
            $(this).attr("data-status",1);

             StartGif = ($(this).data('trivia'));
            $(this).attr("src",gifArray[StartGif].images.downsized.url);
        } else {
            $(this).attr("data-status",1);
            
            StartGif = ($(this).data('trivia'));
           $(this).attr("src",gifArray[StartGif].images.original_still.url);
        }
    }

    $(document).on('click', '.movie', displayMovieInfo);
    $(document).on('click','.gifImage',playGif);
})