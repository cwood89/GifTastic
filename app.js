// api key = 
// 

var topics = ["basketball", "kobe", "lebron", "skateboarding", "kickflip", "balisong", "pokemon", "zelda"];

function addButtons() {
    // loops through topics array
    for (var i = 0; i < topics.length; i++) {
        
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
    $("#buttons").empty();
    topics.push(gifAdd);
    addButtons();
});
// run gif search on button click
$("button").on("click", function() {
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
      })
    .then(function(response) {