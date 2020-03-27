// SETUP VARIABLES

//==================================================
var authKey = "e9bfe5db325344ae8c46552552da294d";


function getRecipes(cuisine) {
    //cuisine parameter will keep changing value as per the value the user put into seach box
    // see line 69 for reference
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
        // console.log(response);
        //console.log(response.results[0].title);

        //generate a random result from the response, so we get a different recipe whenver the user look up a cuisine
        //Math floor math random will always round down the result, that's why we need to + 1 so we could get the result of the last item in the array
        var random = Math.floor(Math.random() * response.results.length + 1);
        //console.log(random);


        var title = $("<h5>");
        //add the random result from the array and try to get the image, id & title of that random recipe
        var imageResult = response.results[random].image;
        var id = (response.results[random].id);
        title.text(response.results[random].title);
        //create image tag
        var img = $("<img>");
        //adding source to the image tag
        img.attr("src", imageResult);

        //call the getReipe function and pass ihe id value into the getRecipe parameter
        getRecipe(id);

        //append the title and image into the .recipes div
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

//when you click the inBtn
//user search input value is saved in to searchInput variable
//.recipes & .steps divs will get emptied out
//getRecipes function is called, and passed the value of the search input

$("#inBtn").on("click", function () {
    var searchInput = $("#search-box").val().trim();
    //.recipes is for recipe title & picture
    $(".recipes").empty();
    //.steps is for instructions
    $(".steps").empty();
    getRecipes(searchInput);

})

// ----------------------------------------------------------------------------------------------------


// API key for Zomato
function getRestaurant(searchInput) {
    var authKey = "94b9c61a4d536d30ce9af305b01251f1";
    var queryURL = "https://developers.zomato.com/api/v2.1/search?entity_id=1219&entity_type=city&q=" + searchInput;

    $.ajax({
        url: queryURL,
        method: "GET",
        headers: { 'user-key': authKey }
    }).then(function (response) {
        console.log(response);

        for (let i=0; i < 5; i++) {

            var restName = (response.restaurants[i].restaurant.name);
            var restAdd = (response.restaurants[i].restaurant.location.address)
            var restRating = (response.restaurants[i].restaurant.user_rating.rating_text);
            var restURL = (response.restaurants[i].restaurant.url);
            console.log(restName, restAdd, restRating);
    
            // var restNameEl = $('<h1>').text(restName);
            var restNameEl = `
            <h1 class="rest-name"><a href="${restURL}" target="_blank">${restName}</a></h1>
            `
            // console.log(response.restaurants[0].restaurant.name);
            
            var restAddEl = $('<h3>').text(restAdd).addClass("address");
            // console.log(response.restaurants[0].restaurant.location.address);
    
            var restRatingEl = $('<h3>').text(restRating);
            // console.log(response.restaurants[0].restaurant.user_rating);

            $('.recipes').append(restNameEl, restAddEl, restRatingEl);
        }
    });

    };

//  button for finding the restaurants
$('#outBtn').on('click', function () {
    var searchInput = $("#search-box").val().trim();
    $('.recipes').empty();
    $('.steps').empty();
    getRestaurant(searchInput);

});


// // 1. retrieve user inputs and convert to variables
// // 2. use those variables to run an AJAX call to spoonacular site
// // 3. breakdown the JSON object into usable fields
// // 4. dynamically generate html content