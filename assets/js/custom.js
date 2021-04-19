$(document).ready(function () {
    var nav = $('.navbar');

    $(window).scroll(function () {
        if ($(this).scrollTop() > 120) {
            nav.removeClass("fixed-bottom");
            nav.addClass('mt-3');
        } else {
            nav.addClass("fixed-bottom");
            nav.addClass('mt-3');
        }
    });
});

var myVar;

function myFunction() {
    myVar = setTimeout(showPage, 3000);
}

function showPage() {
    document.getElementById("loader").style.display = "none";
    document.getElementById("page").style.display = "block";
    document.getElementById("bottom-navigation").style.display = "block";
    var haha = document.getElementById("breadcrumb").style.display = "block";
    console.log(haha);
}

$(".carousel").swipe({

    swipe: function (event, direction, distance, duration, fingerCount, fingerData) {

        if (direction == 'left') $(this).carousel('next');
        if (direction == 'right') $(this).carousel('prev');

    },
    allowPageScroll: "vertical"

});

// setting maping
var map = L.map('map');

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    id: 'mapbox.streets'
}).addTo(map);

// placeholders for the L.marker and L.circle representing user's current position and accuracy    
var current_position, current_accuracy;

function onLocationFound(e) {
    // if position defined, then remove the existing position marker and accuracy circle from the map
    if (current_position) {
        map.removeLayer(current_position);
        map.removeLayer(current_accuracy);
    }

    var radius = e.accuracy / 2;

    current_position = L.marker(e.latlng).addTo(map)
        .bindPopup("Kamu berada " + radius + " meter dari titik utama").openPopup();

    current_accuracy = L.circle(e.latlng, radius).addTo(map);
}

function onLocationError(e) {
    alert(e.message);
}

map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);

// wrap map.locate in a function    
function locate() {
    map.locate({
        setView: true,
        maxZoom: 16
    });
}

// call locate every 3 seconds... forever
setInterval(locate, 3000);