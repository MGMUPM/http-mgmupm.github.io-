var map;
require(["esri/map",
         "esri/geometry/Extent",
         "esri/layers/WebTiledLayer",
         "esri/layers/FeatureLayer", 
         "esri/symbols/SimpleMarkerSymbol",
         "esri/graphic",
         "esri/symbols/SimpleLineSymbol",
         "esri/Color",
         "esri/layers/GraphicsLayer", 
         "dojo/domReady!"],
         function(Map,
                  Extent,
                  WebTiledLayer,
                  FeatureLayer,
                  SimpleMarkerSymbol,
                  Graphic,
                  SimpleLineSymbol,
                  Color,
                  GraphicsLayer) {
   map = new Map("map",                      
    {
    basemap: "topo",
    center: [0.6, 42.65],
    zoom: 12
  });
  var GraphicsLayerMap = new GraphicsLayer();
  map.addLayer(GraphicsLayerMap);
  //Funcion para introducir el mapabase de satelite de Esri, o eliminar el resto de mapasbase
  function changeBaseMapEsri (){
    if(map.layerIds[1]=="DigitalGlobe"){
      map.removeLayer(map.getLayer("DigitalGlobe"));
      console.log("ESRI basemap");
    }
    else if(map.layerIds[1]=="Google"){
      map.removeLayer(map.getLayer("Google"));
      console.log("ESRI basemap");
    }
    else if(map.getBasemap()!="satellite"){
      map.setBasemap("satellite");
      console.log("ESRI basemap");
    }
  }
  //Funcion para introducir el mapabase de DigitalGlobe, y si es necesario eliminar el anterior
  function changeBaseMapDigitalGlobe (){
    if(map.layerIds[1]=="DigitalGlobe"){
      
    }
    else if(map.layerIds[1]=="Google"){
      map.removeLayer(map.getLayer("Google"));
      
      var DigitalGlobeWebTiledLayer = new WebTiledLayer("http://${subDomain}.tiles.mapbox.com/v4/digitalglobe.nal0g75k/${level}/${col}/${row}.png?access_token=pk.eyJ1IjoiZGlnaXRhbGdsb2JlIiwiYSI6ImNpcGg5cm1neTAxMm90ZG5qaW84MmI0eXYifQ.ZWA1dcU-DnZrpp_2NnoKkg", {
        "copyright": "© DigitalGlobe, Inc",
        "id": "DigitalGlobe",
        "subDomains": ["a", "b", "c"]
      });

      map.addLayer(DigitalGlobeWebTiledLayer);
      console.log("Digital Globe basemap");
    }
    else{
    
      var DigitalGlobeWebTiledLayer = new WebTiledLayer("http://${subDomain}.tiles.mapbox.com/v4/digitalglobe.nal0g75k/${level}/${col}/${row}.png?access_token=pk.eyJ1IjoiZGlnaXRhbGdsb2JlIiwiYSI6ImNpcGg5cm1neTAxMm90ZG5qaW84MmI0eXYifQ.ZWA1dcU-DnZrpp_2NnoKkg", {
        "copyright": "© DigitalGlobe, Inc",
        "id": "DigitalGlobe",
        "subDomains": ["a", "b", "c"]
      });

      map.addLayer(DigitalGlobeWebTiledLayer);
      console.log("Digital Globe basemap");
    }
  }
  //Funcion para introducir el mapa base de Google, y si es necesario eliminar el anterior
  function changeBaseMapGoogle (){
    if(map.layerIds[1]=="Google"){
      
    }
    else if(map.layerIds[1]=="DigitalGlobe"){
      
      map.removeLayer(map.getLayer("DigitalGlobe"));
      
      var GoogleWebTiledLayer = new WebTiledLayer("http://mt.google.com/vt/lyrs=s&x={col}&y={row}&z={level}", {
        "copyright": "© Google, Inc",
        "id": "Google"
      });

      map.addLayer(GoogleWebTiledLayer);
      console.log("Google basemap");
    }
    else{
      /*
      var GoogleWebTiledLayer = new WebTiledLayer("http://{subDomain}.tile.opencyclemap.org/cycle/{level}/{col}/{row}.png", {
        "copyright": "© Google, Inc",
        "id": "Google",
        "subDomains": ["a", "b", "c"]
      });
      */
      var GoogleWebTiledLayer = new WebTiledLayer("http://mt.google.com/vt/lyrs=s&x={col}&y={row}&z={level}", {
        "copyright": "© Google, Inc",
        "id": "Google"
      });
      
      map.addLayer(GoogleWebTiledLayer);
      console.log("Google basemap");
    }
    
  }
  function AbrirInput (){
    var DivURL = document.getElementById("DivURL");
    console.log(DivURL.style.display);
    DivURL.style.display="block";
    console.log(DivURL.style.display);
    /*
    var PosibleURL = document.getElementById("URLButton").value;
    var featurelayerIntroducida = new FeatureLayer(PosibleURL,{
        outFields: ["*"]
      });
    map.addLayer(featurelayerGPX);
    */
  }
  n=1;
  function IntroducirFeature (x){
    n = n + 1;
    console.log(x);
    var DivURL = document.getElementById("DivURL");
    var PosibleURL = document.getElementById("InputURL").value;
    
    var featurelayerIntroducida = new FeatureLayer(PosibleURL,{
        outFields: ["*"]
      });
      
    map.addLayer(featurelayerIntroducida);
    
    var NuevaFeature = document.createElement("div");
    NuevaFeature.className = "ElementoCreado";
    NuevaFeature.innerHTML = '<p>' + n +'</p>';
    DivURL.appendChild(NuevaFeature);
    NuevaFeature.childNodes[0].addEventListener("click", function(){
      this.parentNode.removeChild(this);
      var number = String(parseInt(this.innerHTML));
      map.removeLayer(map.getLayer("graphicsLayer" + number.toString()));
      console.log("graphicsLayer" + number.toString());
    })
  }
  
  var SymbolGPX = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_SQUARE, 
                                         10,
                                         new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,new Color([255,0,0]), 1),
                                         new Color([0,255,0,0.25]));
  
  
  
  //Listenner para añadir servicio
  document.getElementById("URLButton").addEventListener("click", AbrirInput);
  
  document.getElementById("LanzarURLButton").addEventListener("click", IntroducirFeature);
  
  //Listenner para las funciones de cambio de mapasbase
  document.getElementById("baseMapESRI").addEventListener("click", changeBaseMapEsri);

  document.getElementById("baseMapDigitalGlobe").addEventListener("click", changeBaseMapDigitalGlobe);

  document.getElementById("baseMapGoogle").addEventListener("click", changeBaseMapGoogle);
   
  
 });