var topics = ["basketball", "kobe", "lebron", "skateboarding", "kickflip", "butterfly knife", "balisong", "pokemon", "zelda"];

function addButtons() {
    // empty button div
    $("#buttons").empty();
    // loops through topics array
    for (var i = 0; i < topics.length; i++) {
        // create button element
        var b = $("<button>");
        // adds a class to buttons for styling
        b.addClass("topic");
        // adds value to buttons for api call
        b.attr("data-name", topics[i]);
        // Providing the initial button text
        b.text(topics[i]);
        // Adding the button to the buttons div
        $("#buttons").append(b);
    }
};
// initial button push
addButtons();
console.log(topics);

// adds button to topic array
$("#addGif").on("click", function(event) {
    event.preventDefault();
    var gifAdd = $("#gif-input").val().trim();
    topics.push(gifAdd);
    addButtons();
});

// run gif search on button click
$("button").on("click", function() {
    // empty gif display div
    $("#gif-display").empty();
    // obtain value from button
    var searchName =  $(this).attr("data-name");
    // create url for api
    var key = "0XrbbyngP4RtQh2ck5pNTozg6RlDTD31";
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchName 
    + "&api_key=" + key + "&limit=10";
    // api call
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        var results = response.data;
        console.log(results);
        // loop through all results
        for (var i = 0; i < results.length; i++) {
            // create gif holder div
            var gifDiv = $("<div>");
            // create image element
            var image = $("<img>")
            // add api data to image element
            image.attr("data-animate", results[i].images.fixed_height.url);
            image.attr("data-still",  results[i].images.fixed_height_still.url);
            image.attr("src", image.attr("data-still"));
            image.attr("data-state", "still");
            // on click run playPause function
            image.on("click", playPause)
            // rating display
            var rating = $("<p>");
            // get rating from api call
            rating.text("Rating: " + results[i].rating);
            // add data to div
            gifDiv.append(image);
            gifDiv.append(rating);
            // append div to DOM
            $("#gif-display").append(gifDiv);
            
        };
    });
});

// play pause function
function playPause() {
    var state = $(this).attr("data-state");
    console.log(state);
    // if gif is sill then amimate
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    // if gif is amimated then pause
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
};

