      // Initial array of movies
      var pokeDeck = ["Pikachu", "Bulbasaur", "Charmander", "Snorlax"];

      // displayMovieInfo function re-renders the HTML to display the appropriate content
function displayGiphy() {

    var pokemon = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=nITHtWGQE6O0bWObetXoDKsmtwa4U6sq&q=" + pokemon + "&limit=10&offset=0&rating=PG&lang=en";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then( function(response){
          // Creating a div to hold the movie
        var pokeDiv = $("<div class='giphy'>");

        // Retrieving the URL for the image
        var imgURL = response.data[0].images.original.url;

        // Creating an element to hold the image
        var image = $("<img>").attr("src", imgURL);

        // Appending the image
        pokeDiv.append(image);
        $("#giphy-view").html(pokeDiv);
    });
    
}
// Function for displaying movie data
function renderButtons() {

    // Deleting the movies prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();

    // Looping through the array of movies
    for (var i = 0; i < pokeDeck.length; i++) {

        // Then dynamicaly generating buttons for each movie in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class of movie-btn to our button
        a.addClass("giphy-btn");
        // Adding a data-attribute
        a.attr("data-name", pokeDeck[i]);
        // Providing the initial button text
        a.text(pokeDeck[i]);
        // Adding the button to the buttons-view div
        $("#buttons-view").append(a);
    }
}
// This function handles events where a movie button is clicked
$("#add-giphy").on("click", function (event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var pokemon = $("#giphy-input").val().trim();

    // Adding movie from the textbox to our array
    pokeDeck.push(pokemon);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
    $("#giphy-input").val("");
});

// Adding a click event listener to all elements with a class of "movie-btn"
$(document).on("click", ".giphy-btn", displayGiphy);

// Calling the renderButtons function to display the intial buttons
renderButtons();
