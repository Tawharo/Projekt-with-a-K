var authKey = "e9bfe5db325344ae8c46552552da294d";

function getRecipes(cuisine) {
  var queryURL =
    "https://api.spoonacular.com/recipes/complexSearch?cuisine=" +
    cuisine +
    "&apiKey=" +
    authKey;

  $.ajax({
    url: queryURL,
    method: "GET",
  }).done(function (response) {
    var random = Math.floor(Math.random() * response.results.length + 1);

    var title = $("<h5>");

    var imageResult = response.results[random].image;
    var id = response.results[random].id;
    title.text(response.results[random].title);
    var img = $("<img>");
    img.attr("src", imageResult);

    getRecipe(id);
    $(".recipes").append(title, img);
  });
}

function getRecipe(id) {
  var recipeURL =
    "https://api.spoonacular.com/recipes/" +
    id +
    "/information/?apiKey=" +
    authKey;
  $.ajax({
    url: recipeURL,
    method: "GET",
  }).done(function (response) {
    console.log(response);
    console.log(response.analyzedInstructions[0].steps[0]);

    let steps = $(".steps");
    let analyzedSteps = response.analyzedInstructions[0].steps;

    for (var i = 0; i <= analyzedSteps.length - 1; i++) {
      steps.append(`${analyzedSteps[i].number} )`);
      steps.append(` ${analyzedSteps[i].step} <br>`);
    }
  });
}

// button for finding recipes
$("#inBtn").on("click", function () {
  var searchInput = $("#search-box").val().trim();

  $(".recipes").empty();

  $(".steps").empty();
  getRecipes(searchInput);
});

function getRestaurant(searchInput) {
  var authKey = "94b9c61a4d536d30ce9af305b01251f1";
  var queryURL =
    "https://developers.zomato.com/api/v2.1/search?entity_id=1219&entity_type=city&q=" +
    searchInput;

  $.ajax({
    url: queryURL,
    method: "GET",
    headers: { "user-key": authKey },
  }).then(function (response) {
    console.log(response);

    for (let i = 0; i < 5; i++) {
      var restName = response.restaurants[i].restaurant.name;
      var restAdd = response.restaurants[i].restaurant.location.address;
      var restRating =
        response.restaurants[i].restaurant.user_rating.rating_text;
      var restURL = response.restaurants[i].restaurant.url;
      console.log(restName, restAdd, restRating);

      var restNameEl = `
            <h1 class="rest-name"><a href="${restURL}" target="_blank">${restName}</a></h1>
            `;
      var restAddEl = $("<h3>").text(restAdd).addClass("address");
      var restRatingEl = $("<h3>").text(restRating);
      $(".recipes").append(restNameEl, restAddEl, restRatingEl);
    }
  });
}

//  button for finding the restaurants
$("#outBtn").on("click", function () {
  var searchInput = $("#search-box").val().trim();
  $(".recipes").empty();
  $(".steps").empty();
  getRestaurant(searchInput);
});
