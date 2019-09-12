// Initial array of movies
var pokeDeck = ["Pikachu", "Bulbasaur", "Charmander", "Snorlax"];

// displayMovieInfo function re-renders the HTML to display the appropriate content
function displayGiphy() {

    var pokemon = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=nITHtWGQE6O0bWObetXoDKsmtwa4U6sq&q=" + pokemon + "&limit=10&offset=0&rating=PG&lang=en";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        // Creating a div to hold the movie
        //var toAdd = document.createDocumentFragment();
        var pokeDiv = $("<div class='giphy flex-container'>");
        for (var i = 0; i < 10; i++) {
            var newDiv = $("<div class='positioning'>");
      
            var rating = response.data[i].rating;
            var imgURL = response.data[i].images.original.url;
            var imgURLStill = response.data[i].images.original_still.url;
            var p = $("<p>").html("Rating: " + rating);
            // Retrieving the URL for the image
            //to do, get each rating and image to fall next to eachother
            // Creating an element to hold the image
            var image = $("<img>");
            image.attr("src", imgURLStill);

            image.attr("data-still", imgURLStill);

            image.attr("data-animate", imgURL);

            image.attr("data-state", "still");

            image.attr("class", "gif");

            $("#giphy-view").html(pokeDiv);
            pokeDiv.append(newDiv);
            newDiv.append(image);
            newDiv.prepend(p);


            $(".gif").on("click", function () {
                // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
                var state = $(this).attr("data-state");
                // If the clicked image's state is still, update its src attribute to what its data-animate value is.
                // Then, set the image's data-state to animate
                // Else set src to the data-still value
                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }
            });
        }
    });

}
function renderButtons() {
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
