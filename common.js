$(document).ready(function(){
  document.getElementById("Inicio").addEventListener("click", function(){
    document.getElementById("map").style = "display: none";
    document.getElementById("Start").style = "display: block";
    document.getElementById("Teledeteccion").style = "display: none";
  })
  document.getElementById("Mapa").addEventListener("click", function(){
    document.getElementById("Start").style = "display: none";
    document.getElementById("map").style = "display: block";
    document.getElementById("Teledeteccion").style = "display: none";
  })
  document.getElementById("TDT").addEventListener("click", function(){
    document.getElementById("Start").style = "display: none";
    document.getElementById("Teledeteccion").style = "display: block";
    document.getElementById("map").style = "display: none";
  })
})