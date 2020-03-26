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
