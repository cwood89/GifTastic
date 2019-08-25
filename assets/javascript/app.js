var topics = ["basketball", "kobe", "lebron", "skateboarding", "kickflip", "butterfly knife", "balisong", "pokemon", "zelda"];

function addButtons() {
    // empty button div
    $(".buttons").empty();
    // loops through topics array
    for (var i = 0; i < topics.length; i++) {
        // create button element
        var b = $("<button>");
        // adds a class to buttons for styling
        b.addClass("button__subject");
        // adds value to buttons for api call
        b.attr("data-name", topics[i]);
        // Providing the initial button text
        b.text(topics[i]);
        // Adding the button to the buttons div
        $(".buttons").append(b);
    }
};

// adds button to topic array
$("#search__button").on("click", function (event) {
    event.preventDefault();
    var search = $(".search__input")
    var searchVal = search.val().trim();
    //if no value then alert 
    if (!searchVal) {
        return
    }
    topics.push(searchVal);
    searchGifs(searchVal);
    addButtons();
    search.val("")
});

// initial button push and search
addButtons();
searchGifs(topics[0])

function searchGifs(search) {

    // empty gif display div
    $(".gifs").empty();
    // create url for api -- need to hide api key
    var key = "0XrbbyngP4RtQh2ck5pNTozg6RlDTD31";
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search
        + "&api_key=" + key + "&limit=15";
    // api call
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var results = response.data;
        if (results.length == 0) {
            var message = $("<h2>Nothing Found</h2>")
            message.attr("class", "gifs__message");
            $(".gifs").append(message)
        }

        // loop through all results
        var i = 0
        function repeat() {

            // }
            // for (var i = 0; i < results.length; i++) {

            // create gif holder div
            var gifDiv = $("<div>");
            gifDiv.attr("class", "gifs__item");

            // append div to DOM
            $(".gifs").append(gifDiv);
            // create image element
            var image = $("<img>")
            // add api data to image element
            image.attr("data-animate", results[i].images.fixed_height.url);

            image.attr("data-still", results[i].images.fixed_height_still.url);

            image.attr("src", image.attr("data-still"));
            image.attr("data-state", "still");
            // on hover run playPause function
            image.hover(playPause, playPause)
            // rating display
            var rating = $("<p>");
            rating.attr("class", "gifs__rating");
            // get rating from api call
            rating.text(results[i].rating);
            // add data to div
            gifDiv.append(image)
            gifDiv.append(rating);

            i++;
            if (i < results.length) {
                setTimeout(repeat, 60)
            }
        };
        repeat();
    });
}

// run gif search on button click
$(".buttons").on("click", "button", function () { // used event delegation register click on newly added buttons
    var searchName = $(this).attr("data-name");
    searchGifs(searchName);
});

// play pause function
function playPause() {
    var state = $(this).attr("data-state");
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