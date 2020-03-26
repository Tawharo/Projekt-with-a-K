//alert("test");

// SETUP VARIABLES
//==================================================
var authKey = "e9bfe5db325344ae8c46552552da294d";


var queryURL = "https://api.spoonacular.com/recipes/complexSearch?cuisine=mexican&apiKey=" + authKey;




// FUNCTIONS
//===================================================



$.ajax({
    url: queryURL,
    method: "GET",
}).done(function(response) {
    console.log(response);
    console.log(response.results[0].title);
    var imageResult = response.results[0].image;
    var img = $("<img>");
    img.attr("src", imageResult);
    $(".panel-body").append(img);
});




// MAIN PROCESSES
//=====================================================


//e9bfe5db325344ae8c46552552da294d

// 1. retrieve user inputs and convert to variables
// 2. use those variables to run an AJAX call to spoonacular site
// 3. breakdown the JSON object into usable fields
// 4. dynamically generate html content
