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
        console.log(response.analyzedInstructions[0].steps[0])

        let steps = $(".steps")
        let analyzedSteps = response.analyzedInstructions[0].steps

        for (var i = 0; i <= analyzedSteps.length - 1; i++) {
            steps.append(`${analyzedSteps[i].number} )`)
            steps.append(` ${analyzedSteps[i].step} <br>`)
        }
    });
}
$("#inBtn").on("click", function () {
    var searchInput = $("#search-box").val().trim();
    getRecipes(searchInput)
})
    //  button for finding the restaurants
$("#outBtn").on("click", function () {
    var searchInput = $("#search-box").val().trim();


    // API key for Zomato

    var authKey = "94b9c61a4d536d30ce9af305b01251f1";
    var queryURL = "https://developers.zomato.com/api/v2.1/search?entity_id=1219&entity_type=city&q=" + searchInput;

    $.ajax({
        url: queryURL,
        method: "GET",
        headers: { 'user-key': authKey }
    }).then(function (response) {
        // createDisplay(response);
        console.log(response);

        var restName = $("<h5>");
        var restName = $('<h1>').text(data.restaurants[1].restaurant.name);
        $(".recipes").append(restName);

    });
})

// // 1. retrieve user inputs and convert to variables
// // 2. use those variables to run an AJAX call to spoonacular site
// // 3. breakdown the JSON object into usable fields
// // 4. dynamically generate html content