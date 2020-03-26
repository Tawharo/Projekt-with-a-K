// SETUP VARIABLES
//==================================================
var authKey = "e9bfe5db325344ae8c46552552da294d";

function getRecipes(cuisine) {
   
    var queryURL = "https://api.spoonacular.com/recipes/complexSearch?cuisine=" + cuisine + "&apiKey=" + authKey;

    // FUNCTIONS
    //==========================https://api.spoonacular.com/recipes/{id}/information=========================

    $.ajax({
        url: queryURL,
        method: "GET",
    }).done(function (response) {
        //do a for loop to look thru the response results for all recipes, can limit to like 5
        //take the id and pass it into a 2nd url to get the recipe instructions and ingerdients
        //display the title onto the webpage, then display the recipe
        console.log(response);
        console.log(response.results[0].title);
        var imageResult = response.results[0].image;
        var img = $("<img>");
        img.attr("src", imageResult);
        var id = (response.results[0].id);

        getRecipe(id);



        var title = $("<h5>");
        title.text(response.results[0].title);
        $(".recipes").append(title, img);
    });
}

function getRecipe(id) {

    var recipeURL = "https://api.spoonacular.com/recipes/" + id + "/information/?apiKey=" + authKey;

    $.ajax({
        url: recipeURL,
        method: "GET"
    }).done(function (response) {
        console.log(response);
    });
}

$("#inBtn").on("click", function () {
    var searchInput = $("#search-box").val().trim();
    getRecipes(searchInput)
})
// MAIN PROCESSES
//=====================================================

//does id need to be in curly braces {}
//var queryURL2 = "https://api.spoonacular.com/recipes/" + id + "/information"
//e9bfe5db325344ae8c46552552da294d

// 1. retrieve user inputs and convert to variables
// 2. use those variables to run an AJAX call to spoonacular site
// 3. breakdown the JSON object into usable fields
// 4. dynamically generate html content
