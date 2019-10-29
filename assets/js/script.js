const astronomyList = {
  'stars': ['Class O', 'Class B', 'Class A', 'Class F', 'Class G', 'Class K', 'Class M'],
  'galaxies': ['Elliptical', 'Spiral', 'Lenticular'],
  'solar system': ['Sun', 'Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune'],
  'nebulae': ['H II regions', 'Planetary nebula', 'Supernova remnant', 'Dark nebula']
};

for (item in astronomyList) {
  $('#astronomyList').append(
    $('<h3>').text(item[0].toUpperCase() + item.slice(1).toLowerCase())
  );

  astronomyList[item].forEach(function (type) {
    $('<ul>').append(
      $('<li>').text(type)
    ).appendTo('#astronomyList');
  });
}

$('#astronomyList').on('click', 'li, h3', function () {
  console.log($(this).text());
  displayInfo($(this).text());
});

function displayInfo(string) {
  let params = $.param({
    q: string
  });

  $.ajax({
    url: 'https://images-api.nasa.gov/search?' + params,
    method: 'GET'
  }).then(function (response) {
    console.log(response);
  });
}