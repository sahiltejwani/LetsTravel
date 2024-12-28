var platform = new H.service.Platform({
    'apikey': 'GOt3MVIpnOJGqP8MVmjjwdm2R7ka-V4usyBIXVO3BYc'
});
  
// Obtain the default map types from the platform object:
var defaultLayers = platform.createDefaultLayers();
var service = platform.getSearchService();

let landmark = document.querySelector('.main-heading').textContent;
service.geocode({
    q: landmark
}, (result) => {
    var map = new H.Map(
        document.querySelector('.map'),
        defaultLayers.vector.normal.map,
        {
          zoom: 15,
          center: result.items[0].position
        });
    // to set the marker it is added
    map.addObject(new H.map.Marker(result.items[0].position));
    // Create the default UI:
    var ui = H.ui.UI.createDefault(map, defaultLayers);

}, alert);

// Instantiate (and display) a map object:
