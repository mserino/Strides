$(document).ready(function(){
  var startingPoint = {
      address: 'Straße des 17. Juni 31, Berlin, Germany'
    }

  var hotels = [
    {
      name: 'The Ritz Carlton',
      address: 'Postdamer Platz 3, 10785 Berlin, Germany',
      lat: 52.51003,
      lng: 13.375434,
      rating: '4.3',
      price: '£205',
      gym: 'Gym ✓',
      wifi: 'Free Wifi ✓',
      breakfast: 'Breakfast not included ✗',
      photo1: 'ritz_carlton_1.jpg'
    },
    {
      name: 'The Mandala Hotel',
      address: 'Postdamer Straße 3, 10785 Berlin, Germany',
      lat: 52.5093,
      lng: 13.3737,
      rating: '4.5',
      price: '£133',
      gym: 'Gym ✓',
      wifi: 'Free Wifi ✓',
      breakfast: 'Breakfast included ✓',
      photo1: 'mandala_hotel_1.jpg'
    }
  ];

  var map = new GMaps({
    div: '#map',
    lat: 0,
    lng: 0
  });

  var iconOffset = 0.0015

  GMaps.geocode({
    address: startingPoint.address,
    callback: function(results, status) {
      if (status == 'OK') {
        var latlng = results[0].geometry.location;
        map.setCenter(latlng.lat(), latlng.lng());
        map.addMarker({
          lat: 52.51518 - iconOffset,
          lng: 13.35938,
          icon: "/start_line_icon.png"
        });
      }
    }
  });

  map.addMarker({
    lat: 52.51622 - iconOffset,
    lng: 13.37573,
    title: 'Finish Line',
    icon: "/finish_line_icon.png",

    // click: function(e) {
      // alert('You clicked in this marker');
    // }
    infoWindow: {
      content: '<p>Finish Line</p>'
    }
  });

  hotels.forEach(function(hotel){
    var route = map.getRoutes({
      origin: [hotel.lat, hotel.lng], //hotel coordinates
      destination: [52.51518, 13.35938], //start line coordinates
      callback: function (e) {
          var time = 0;
          var distance = 0;
          var legs = e.pop().legs;

          for (var i=0; i<legs.length; i++) {
              time += legs[i].duration.value;
              distance += legs[i].distance.value;
          }
          var minutesH = time/60;
          var minutes = Math.round(minutesH*100)/100;
          
          var metres = distance/1000;
          var km = Math.round(metres*100)/100;

          hotel.minutes = minutes;
          hotel.km = km;

          map.addMarker({
            lat: hotel.lat,
            lng: hotel.lng,
            title: 'hotel',
            icon: "/hotel_icon.png",
            infoWindow: {
              content: 
                '<p><img class="hotel-photo" src="/assets/' + hotel.photo1 + '"></p><p>'+ hotel.name + '</p><p>' + hotel.address + '</p><p>' + hotel.rating + '</p><p>'+ hotel.price + '</p><p>' + hotel.gym + '</p><p>' + hotel.breakfast + '</p><p>' + hotel.wifi + '</p><p>'
                + hotel.minutes + ' minutes walk from start line (' + hotel.km + ' km)</p>'
            }
          });
      }
    });
  })



  window.map = map;

})