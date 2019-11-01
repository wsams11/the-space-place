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
    Nebulae: [
        "Boomerang Nebula",
        "NGC 7635",
        "California Nebula",
        "Carina Nebula",
        "Cone Nebula",
        "Crescent Nebula",
        "Eagle Nebula",
        "Carina Nebula",
        "Flame Nebula",
        "Gum Nebula",
        "Heart Nebula",
        "Homunculus Nebula",
        "Horsehead Nebula",
        "Lagoon Nebula",
        "North America Nebula",
        "Omega Nebula",
        "Orion Nebula",
        "Pistol Nebula",
        "Rosette Nebula",
        "Tarantula Nebula",
        "Trifid Nebula",
    ]
};

let nasaDescrip;

for (item in astronomyList) {
    $("#astronomyList").append(
        $("<p>")
            .addClass("menu-label")
            .text(item)
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

$("#astronomyList").on("click", "li", function () {
    let searchTerm = $(this).text();

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

        $("#nasa")
            .empty()
            .append(
                $("<div>")
                    .addClass("modal")
                    .append(
                        $("<div>")
                            .addClass("modal-background"),
                        $("<div>")
                            .addClass("modal-content")
                            .attr("id", "nasaImg"),
                        $("<button>")
                            .addClass("modal-close is-large")
                    )
            );

        for (let i = 0; i < 10; i++) {
            let imageObj = response.collection.items[i];
            console.log(response);
            let title = imageObj.data[0].title;
            nasaDescrip = imageObj.data[0].description;
            let image = imageObj.links[0].href;

            $("<div>")
                .addClass("grid-sizer grid-item")
                .append($("<img>").attr("src", image))
                .appendTo($("#nasa"));
        }
        var $grid = $('.grid').imagesLoaded(function () {
            $grid.masonry({
                itemSelector: '.grid-item',
                percentPosition: true,
                columnWidth: '.grid-sizer'
            });
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
        let extract = trimExtract(response.query.pages[page].extract);

        console.log(extract);
        $("#wiki").empty();
        $("#wiki").append(
            $("<h2>")
                .addClass("title")
                .text(string),
            $("<p>").text(extract)
        );
    });
}

function trimExtract(extract) {
    return extract.split(" ").length > 200
        ? extract
            .trim()
            .split(" ")
            .filter((word, index) => index <= 200)
            .join(" ")
            .concat("...")
        : extract;
}

$("#nasa").on("click", "img", function () {

    let imgSrc = $(this).attr("src");
    
    $("#nasaImg").empty();

    $(".modal").addClass("is-active");
        
    $("#nasaImg").append($("<img>").attr("src", imgSrc));

    $(".modal-close, .modal-background").on("click", function() {
    
        $(".modal").removeClass("is-active");

    })

});


