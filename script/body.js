require([
      "esri/Map",
      "esri/views/MapView",
      "dojo/domReady!"
    ], function(Map, MapView) {

      var map = new Map({
        basemap: "streets"
      });
	  
	  var utah_dem_layer = new MapImageLayer({url: "http://geoserver2.byu.edu/arcgis/rest/services/Valor/Elevations/MapServer"});
	  
	  var utah_shp_layer = new MapImageLayer({url: "http://geoserver2.byu.edu/arcgis/rest/services/Valor/SpeedLimit/MapServer"});
	  
	  map.layers.add(utah_dem_layer);
	  map.layers.add(utah_shp_layer);

      var view = new MapView({
        container: "viewDiv",
        map: map,
        zoom: 6,
        center: [-111.1, 39.1] // longitude, latitude
      });

    });