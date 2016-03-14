$(document).ready(function(){

    var movies = ["batman"];

    // Create a button of each item inputed
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

    // show the gif when they press the button
    function displayMovieInfo(){
        $("#moviesView").empty();

        var movie = $(this).attr('data-name');
        var queryURL = "http://api.giphy.com/v1/gifs/search?q="+movie+"&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({url: queryURL, method: 'GET'}).done(function(response) {
            gifArray = (response.data);

         for (var i = 0; i < gifArray.length; i++) {
            var BoxDiv = $("<div>").addClass("BoxDiv");

            // Get the rating and create a div for the text
            var p = $("<p>").addClass("rating").text("Rating: "+gifArray[i].rating); 

            // Get the gif and create a div for the still image 
            var showGif = $('<img>')
            showGif.attr({"data-trivia": i, "data-status": 0});
            showGif.attr("src",gifArray[i].images.original_still.url).addClass("gifImage");

            // append the image and rating to the main div=BoxDiv
            BoxDiv.append(p);
            BoxDiv.append(showGif);

            // add the div to the page
            $("#moviesView").append(BoxDiv);            
         };
    });
    }

    // get the information from the form push it to the renderButtons
        $('#addMovie').on('click', function(){
            var movie = $('#movie-input').val().trim();
            movies.push(movie);
            renderButtons();
            return false;
    });
    
    // play and pause the gif
    function playGif(){
        // play gif
        if (($(this).attr('data-status'))==0) {
            // change the status to play the gif
            $(this).attr("data-status",1);
            // swap still image for gif
             StartGif = ($(this).data('trivia'));
            $(this).attr("src",gifArray[StartGif].images.downsized.url);
        } else {
            // change the status to still image
            $(this).attr("data-status",0);
            // swap still image for gif
            StartGif = ($(this).data('trivia'));
           $(this).attr("src",gifArray[StartGif].images.original_still.url);
        }
    }

    // pass the on click function to all new objects
    $(document).on('click', '.movie', displayMovieInfo);
    $(document).on('click','.gifImage',playGif);
})