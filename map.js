var map;
var IndiceDeVegetacion;
require(["esri/map",
         "esri/geometry/Extent",
         "esri/layers/WebTiledLayer",
         "esri/layers/FeatureLayer", 
         "esri/symbols/SimpleMarkerSymbol",
         "esri/graphic",
         "esri/symbols/SimpleLineSymbol",
         "esri/Color",
         "esri/layers/GraphicsLayer",
         "esri/layers/ArcGISTiledMapServiceLayer",
         "esri/InfoTemplate",
         "esri/dijit/PopupTemplate",
         "dojo/domReady!"],
         function(Map,
                  Extent,
                  WebTiledLayer,
                  FeatureLayer,
                  SimpleMarkerSymbol,
                  Graphic,
                  SimpleLineSymbol,
                  Color,
                  GraphicsLayer,
                  ArcGISTiledMapServiceLayer,
                  InfoTemplate,
                  PopupTemplate) {
   map = new Map("map",                      
    {
    basemap: "satellite",
    center: [-5.61, 40.44],
    zoom: 11
  });
  var GraphicsLayerMap = new GraphicsLayer();
  GraphicsLayerMap.id = "Capa de graáficos";
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
    featurelayerIntroducida.id = x;
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
   
  IndiceDeVegetacion = {"NDVI": 
    {"A2002": 
      {"url": "https://tiles.arcgis.com/tiles/48UigidgWzi72h11/arcgis/rest/services/LE7_NDVI_2002/MapServer",
      "satelite": "Landsat 7"}
    ,
    "A2003":
      {"url": "https://tiles.arcgis.com/tiles/48UigidgWzi72h11/arcgis/rest/services/LE7_NDVI_2003/MapServer",
      "satelite": "Landsat 5"}
    ,
    "A2007":
      {"url": "https://tiles.arcgis.com/tiles/48UigidgWzi72h11/arcgis/rest/services/LT5_NDVI_2007/MapServer",
      "satelite": "Landsat 5"}
    ,
    "A2009":
      {"url": "https://tiles.arcgis.com/tiles/48UigidgWzi72h11/arcgis/rest/services/LT5_NDVI_2009/MapServer",
      "satelite": "Landsat 5"}
    ,
    "A2010":
      {"url": "https://tiles.arcgis.com/tiles/48UigidgWzi72h11/arcgis/rest/services/LT5_NDVI_2010/MapServer",
      "satelite": "Landsat 5"}
    ,
    "A2012":
      {"url": "https://tiles.arcgis.com/tiles/48UigidgWzi72h11/arcgis/rest/services/LT5_NDVI_2012/MapServer",
      "satelite": "Landsat 5"}
    },
    "NBR": 
    {"A2002": 
      {"url": "https://tiles.arcgis.com/tiles/48UigidgWzi72h11/arcgis/rest/services/NBR_v2_2002/MapServer",
      "satelite": "Landsat 7",}
    ,
    "A2003":
      {"url": "https://tiles.arcgis.com/tiles/48UigidgWzi72h11/arcgis/rest/services/NBR_v2_2003/MapServer",
      "satelite": "Landsat 5"}
    ,
    "A2007":
      {"url": "https://tiles.arcgis.com/tiles/48UigidgWzi72h11/arcgis/rest/services/NBR_v2_2007/MapServer",
      "satelite": "Landsat 5"}
    ,
    "A2009":
      {"url": "https://tiles.arcgis.com/tiles/48UigidgWzi72h11/arcgis/rest/services/NBR_v2_2009/MapServer",
      "satelite": "Landsat 5"}
    ,
    "A2010":
      {"url": "https://tiles.arcgis.com/tiles/48UigidgWzi72h11/arcgis/rest/services/NBR_v2_2010/MapServer",
      "satelite": "Landsat 5"}
    ,
    "A2011":
      {"url": "https://tiles.arcgis.com/tiles/48UigidgWzi72h11/arcgis/rest/services/NBR_v2_2011/MapServer",
      "satelite": "Landsat 5"}
    ,
    "A2012":
      {"url": "https://tiles.arcgis.com/tiles/48UigidgWzi72h11/arcgis/rest/services/NBR_v2_2011/MapServer",
      "satelite": "Landsat 5"}
    }
  };
  for(i=0;i<document.getElementsByName("año").length;i++){
    document.getElementsByName("año")[i].addEventListener("click", function(){
      debugger;
      if(map.getLayer("Año") != undefined){
        map.removeLayer(map.getLayer("Año"))
      }
      document.getElementById("subtitleYear").innerHTML = this.getAttribute("datevalue");
      var seleccion = this.getAttribute("date");
      var IdV = document.getElementById("indiceDeVegetacion").value;
      var TileIV = new ArcGISTiledMapServiceLayer(IndiceDeVegetacion[IdV][seleccion].url, {id:"Año"});
      map.addLayer(TileIV);
    })
  }
  document.getElementById("indiceDeVegetacion").addEventListener("click", function(){
    if(document.getElementById("indiceDeVegetacion").value == "NDVI"){
      document.getElementById("indiceDeVegetacion").value = "NBR";
      for(i=0;i<document.getElementsByName("año").length;i++){
        if(document.getElementsByName("año")[i].checked == true){
          var dateElemento = document.getElementsByName("año")[i].getAttribute("date");
          var datevalueElemento = document.getElementsByName("año")[i].getAttribute("datevalue");
        }
      }
      if(map.getLayer("Año") != undefined){
        map.removeLayer(map.getLayer("Año"))
      }
      var IdV = document.getElementById("indiceDeVegetacion").value;
      var TileIV = new ArcGISTiledMapServiceLayer(IndiceDeVegetacion[IdV][dateElemento].url, {id:"Año"});
      map.addLayer(TileIV);
    }
    else if(document.getElementById("indiceDeVegetacion").value == "NBR"){
      document.getElementById("indiceDeVegetacion").value = "NDVI";
      for(i=0;i<document.getElementsByName("año").length;i++){
        if(document.getElementsByName("año")[i].checked == true){
          var dateElemento = document.getElementsByName("año")[i].getAttribute("date");
          var datevalueElemento = document.getElementsByName("año")[i].getAttribute("datevalue");
        }
      }
      if(map.getLayer("Año") != undefined){
        map.removeLayer(map.getLayer("Año"))
      }
      var IdV = document.getElementById("indiceDeVegetacion").value;
      var TileIV = new ArcGISTiledMapServiceLayer(IndiceDeVegetacion[IdV][dateElemento].url, {id:"Año"});
      map.addLayer(TileIV);
      
    }
  })
  
  for(i=0;i<document.getElementsByClassName("featureCheckbox").length;i++){
    document.getElementsByClassName("featureCheckbox")[i].addEventListener("click", function(i){
      var featureUrl = "https://services2.arcgis.com/48UigidgWzi72h11/arcgis/rest/services/Vegetacion_Tipo/FeatureServer/" + this.getAttribute("num");
      if(this.checked == true){
        debugger;
        var infoTemplate = new InfoTemplate("Atributos", "${*}");
        var template = new PopupTemplate({
          title: "Atributos",

          fieldInfos: [
            { fieldName: "MEAN_2002", visible: true, format: { places: 5 } },
            { fieldName: "MEAN_2003", visible: true, format: { places: 5 } },
            { fieldName: "MEAN_2007", visible: true, format: { places: 5 } },
            { fieldName: "MEAN_2009", visible: true, format: { places: 5 } },
            { fieldName: "MEAN_2010", visible: true, format: { places: 5 } },
            { fieldName: "MEAN_2012", visible: true, format: { places: 5 } }
          ],

          mediaInfos: [
            {
              type: "linechart",
              value: { 
                fields: [ 
                  "MEAN_2002","MEAN_2003","MEAN_2007","MEAN_2009","MEAN_2010","MEAN_2012"
                ] 
              }
            }
          ],
          showAttachments : true
        });
        map.addLayer(new FeatureLayer(featureUrl,{
          id: this.parentElement.innerText,
          outFields: ["MEAN_2002","MEAN_2003","MEAN_2007","MEAN_2009","MEAN_2010","MEAN_2012"],
          infoTemplate: template
        }));
      }
      else if(this.checked == false){
        debugger;
        map.removeLayer(map.getLayer(this.parentElement.innerText));
      }
    })
  }
});