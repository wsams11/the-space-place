const astronomyList = {
  star: [
    "Class O",
    "Class B",
    "Class A",
    "Class F",
    "Class G",
    "Class K",
    "Class M"
  ],
  galaxy: ["Elliptical", "Spiral", "Lenticular"],
  "solar system": [
    "Sun",
    "Mercury",
    "Venus",
    "Earth",
    "Mars",
    "Jupiter",
    "Saturn",
    "Uranus",
    "Neptune"
  ],
  nebula: [
    "H II regions",
    "Planetary nebula",
    "Supernova remnant",
    "Dark nebula"
  ]
};

for (item in astronomyList) {
  $("#astronomyList").append(
    $("<p>")
      .addClass("menu-label")
      .text(item[0].toUpperCase() + item.slice(1).toLowerCase())
  );

  let category = $("<ul>").addClass("menu-list");

  astronomyList[item].forEach(function (type) {
    category
      .append(
        $("<li>")
          .append($("<a>"))
          .text(type)
      )
      .appendTo("#astronomyList");
  });
}

$("#astronomyList").on("click", "li, p", function () {
  let searchTerm = $(this).text();

  searchTerm +=
    " " +
    $(this)
      .parent()
      .prev()
      .text();

  console.log(searchTerm);

  displayInfo(searchTerm);
});

function displayInfo(string) {
  let params = $.param({
    q: string
  });

  $.ajax({
    url: "https://images-api.nasa.gov/search?" + params,
    method: "GET"
  }).then(function (response) {
    $("#nasa").empty();

    for (let i = 0; i < 6; i++) {
      let imageObj = response.collection.items[i];
      console.log(response);
      let title = imageObj.data[0].title;
      let description = imageObj.data[0].description;
      let image = imageObj.links[0].href;

      $("<div>")
        .addClass("grid-item")
        .append($("<img>").attr("src", image))
        .appendTo($("#nasa"));
    }
    $('.grid').masonry({
      // options
      itemSelector: '.grid-item',
      columnWidth: 200
    });
  });


  let wikiParams = $.param({
    action: "query",
    prop: "extracts",
    exintro: "",
    explaintext: "",
    format: "json",
    titles: string,
    origin: "*"
  });

  $.ajax({
    url: "https://en.wikipedia.org/w/api.php?" + wikiParams,
    method: "GET"
  }).then(function (response) {
    console.log("wiki", response);
    console.log("wiki", string);
    let page = Object.keys(response.query.pages)[0];
    console.log("wiki", response);
  });
}
