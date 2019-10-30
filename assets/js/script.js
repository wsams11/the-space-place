const astronomyList = {
  'star': ['Class O', 'Class B', 'Class A', 'Class F', 'Class G', 'Class K', 'Class M'],
  'galaxies': ['Elliptical', 'Spiral', 'Lenticular'],
  'solar system': ['Sun', 'Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune'],
  'nebulae': ['H II regions', 'Planetary nebula', 'Supernova remnant', 'Dark nebula'],
};
​
for (item in astronomyList) {
  $('#astronomyList').append(
    $('<h3>').text(item[0].toUpperCase() + item.slice(1).toLowerCase())
  );
​
  astronomyList[item].forEach(function (type) {
    $('<ul>').append(
      $('<li>').text(type)
    ).appendTo('#astronomyList');
  });
}
​
$('#astronomyList').on('click', 'li, h3', function () {
    
 displayInfo($(this).text());
});
​
function displayInfo(string) {
  let params = $.param({
    q: string
  });
​
  $.ajax({
    url: 'https://images-api.nasa.gov/search?' + params,
    method: 'GET'
  }).then(function (response) {
    for (let i = 0; i< 6; i++) {
      let imageObj = response.collection.items[i];
      console.log(response); 
​
      let title = imageObj.data[0].title;
      let description = imageObj.data[0].description;
      let image = imageObj.links[0].href;
​
      $("<div>").addClass("card").append($("card-image")).append($("<img>").attr("src", image)).appendTo($("#nasa"));
    }
  });
​
    let wikiParams = $.param({
        action: "query",
        prop: "extracts",
        exintro: "",
        explaintext: "",
        format: "json",
        titles: string,
        origin: "*",
    });
​
  $.ajax({
      url: 'https://en.wikipedia.org/w/api.php?' + wikiParams,
      method: 'GET'
  }).then( function (response) {
      console.log(response);
      
  })
}