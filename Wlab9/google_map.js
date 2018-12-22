function initMap() {
    var myLatLng = {lat: 40.790074, lng: -73.882943};

    var map = new google.maps.Map(document.getElementById('map'), {
        center: myLatLng,
        zoom: 14,
        minZoom: 14,
        maxZoom: 17
    });

    var infoWindow = new google.maps.InfoWindow({
        content: "We are here"
    });

    var defaultBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(40.2484836, -73.0373796),
        new google.maps.LatLng(41.011466, -74.5141759));

    var marker = new google.maps.Marker({
          position: myLatLng,
          map: map,
          animation: google.maps.Animation.DROP
    });
    marker.addListener('mouseover', toggleBounce);
    marker.addListener('click', function() {
      infoWindow.open(map, marker);
    });
    
    function toggleBounce() {
       if (marker.getAnimation() !== null) {
         marker.setAnimation(null);
       } else {
         marker.setAnimation(google.maps.Animation.BOUNCE);
       }
     }
}
