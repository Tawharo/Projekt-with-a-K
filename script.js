<<<<<<< HEAD
// API key for Spoonacular




// code for grabbing the info and appending to the html







// code for making the ajax call







// -----------------------------------------------------------------------------------------------------


// link to initial search button for type of food. This will be shared between recepies and restaurants
// $('#search-btn').on('click', function (event) {

//     event.preventDefault();
//     var cuisine = $('#search-input').val();
//     $('#search-input')
//    .val("");
//    .trim(); 



    // API key for Zomato
var apiKey = "94b9c61a4d536d30ce9af305b01251f1";
var queryURL = "https://developers.zomato.com/api/v2.1/search?entity_type=city&q=italian&start=richmond";





var createDisplay = function(data) {
    var restDiv = $('<div>');
    // queries
    var restName = $('<h1>').text(data.restaurants[1].restaurant.name);
    console.log(data.restaurants[3].restaurant.name);
    
    var restAdd = $('<h3>').text(restaurant[1].restaurant.location.address);
    console.log(data.restaurants[1].restaurant.location.address);

    var restRating = $('<h3>').text(restaurant[1].restaurant.user_rating);
    console.log(data.restaurants[1].restaurant.user_rating);
    
    // Append to newly created div
    restDiv.append(restName, restAdd, restRating);

    // Append to the card
    $('#results').append(restDiv);
};


function callZomato() {
    return $.ajax({
        url: queryURL,
        method: "GET",
        headers: { 'user-key': apiKey }
    }).then(function (response) {
        createDisplay(response);
        // console.log(response);
    });
};

callZomato();

// "https://developers.zomato.com/api/v2.1/search?entity_type=city&q=italian&start=richmond"
=======
// SETUP VARIABLES
//==================================================

function getRecipes(cuisine) {
    var authKey = "e9bfe5db325344ae8c46552552da294d";
var queryURL = "https://api.spoonacular.com/recipes/complexSearch?cuisine=" + cuisine + "&apiKey=" + authKey;

// FUNCTIONS
//===================================================

$.ajax({
    url: queryURL,
    method: "GET",
}).done(function(response) {
    //do a for loop do look thru the response results for all recipes, can limit to like 5
    //display the title onto the webpage, then display the recipe
    console.log(response);
    console.log(response.results[0].title);
    var imageResult = response.results[0].image;
    var img = $("<img>");
    img.attr("src", imageResult);
    
    var title = $("<h5>");
    title.text(response.results[0].title);
    $(".recipes").append(title, img);
});
}

$("#inBtn").on("click",function(){
    var searchInput = $("#search-box").val().trim();
    getRecipes(searchInput)
})
// MAIN PROCESSES
//=====================================================


//e9bfe5db325344ae8c46552552da294d

// 1. retrieve user inputs and convert to variables
// 2. use those variables to run an AJAX call to spoonacular site
// 3. breakdown the JSON object into usable fields
// 4. dynamically generate html content
>>>>>>> f4d8a077fbd014b352611be232129441da14f7ab
