require([
      "esri/Map",
	  "esri/layers/MapImageLayer",
	  "esri/layers/FeatureLayer",
      "esri/views/MapView",
	  "dojo/dom",  // require dojo/dom for getting the DOM element
	  "dojo/on",   // require dojo/on for listening to events on the DOM
      "dojo/domReady!"
    ], function(Map, MapImageLayer, FeatureLayer, MapView, dom, on) {

	//Create the Map
      var map = new Map({
        basemap: "streets"
      });
	  
	  var utah_dem_layer = new MapImageLayer({url: "http://geoserver2.byu.edu/arcgis/rest/services/Valor/Elevations/MapServer"});
	  
	  //var speedlimitlayer = new MapImageLayer({url: "http://geoserver2.byu.edu/arcgis/rest/services/Valor/MyMapService/MapServer"});
	  
	  map.layers.add(utah_dem_layer);
	  //map.layers.add(speedlimitlayer);

	  //Create the Map View
      var view = new MapView({
        map: map,
		container: "viewDiv",
        zoom: 15,
        center: [-111.662414, 40.236778] // longitude, latitude
      });

	  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	  //The Popup
	  var popup = { // autocasts as new PopupTemplate()
        title: "<p>Information about road {Name} in/near {ADDRSYS_L}</p>",
        content: "<ul><li>The zip code is {ZIPCODE_L}</li>" +
		  "<li>The speed limit is {SPEED_LMT} mph</li>",
        fieldInfos: [{
          fieldName: "SPEED_LMT",
          format: {
            digitSeparator: true, // Use a comma separator for large numbers
            places: 0 // Sets the number of decimal places to 0 and rounds up
          }
        }]
      };
	  
	  	// Reference the popupTemplate instance in the
		// popupTemplate property of FeatureLayer
	  var featureLayer = new FeatureLayer({
        url: "http://geoserver2.byu.edu/arcgis/rest/services/Valor/FullRoadshp/FeatureServer/0",
        outFields: ["*"],
        popupTemplate: popup
		});
		map.add(featureLayer);
	  
	  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	  	// Create a variable referencing the checkbox node for Utah DEM
      var demLayerToggle = dom.byId("dem");
	    
		// Listen to the onchange event for the checkbox
		on(demLayerToggle, "change", function(){
		// When the checkbox is checked (true), set the layer's visibility to true
		utah_dem_layer.visible = demLayerToggle.checked;
		});
		
		// Create a variable referencing the checkbox node for Utah SpeedLimit
	  var speedlimiLyrToggle = dom.byId("speedlimit");
	  
		// Listen to the onchange event for the checkbox
		on(speedlimiLyrToggle, "change", function(){
		// When the checkbox is checked (true), set the layer's visibility to true
		featureLayer.visible = speedlimiLyrToggle.checked;
		});
		

	  
    });