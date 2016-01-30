var mines = {
  flymine: {
    name: "FlyMine",
    location: {
      lat: 52.2003296,
      lon: 0.1198779,
      string : "University of Cambridge"
    },
    url: "http://www.flymine.org"
  },
  humanmine: {
    name: "HumanMine",
    location: {
      lat: 52.2003296,
      lon: 0.1198779,
      string : "University of Cambridge"
    },
    url: "http://www.humanmine.org"
  },
  targetmine: {
    name: "TargetMine",
    location: {
      lat: 34.8528352,
      lon: 135.5192669,
      string : "Mizuguchi Lab, Osaka"
    },
    url: "http://targetmine.mizuguchilab.org/"
  },
  mousemine: {
    name: "MouseMine",
    location: {
      lat: 44.3662447,
      lon: -68.1987745,
      string : "MGI"
    },
    url: "http://www.mousemine.org/mousemine/begin.do"
  }
};

var mineMiner = function() {
  var map;
  function init() {
    map = L.map('map').setView([mines.humanmine.location.lat, mines.humanmine.location.lon], 3);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: 'sk.eyJ1IjoieW9jaGFubmFoIiwiYSI6ImNpazEzdHZscTAyemR4NG01cWE2enZlcDQifQ.khbJ9AQiNTIdrniQRN8gEg'
    }).addTo(map);
    addMines();
  }
  /**
  * Adds all mines in the JSON to the map and make nice popups for them
  **/
  function addMines(){
    var mineKeys = Object.keys(mines), mine;
    for (var i = 0; i < mineKeys.length; i++) {
      mine = mines[mineKeys[i]];
      //make marker
      L.marker([mine.location.lat, mine.location.lon])
      //push to map
      .addTo(map)
      //add a popup for it so users can click and learn things
      .bindPopup(makeMinePopup(mine))
    }
  }
  /**
  * Format HTML for the map mine popup
  **/
  function makeMinePopup(mine){
    var mineHtml = "<b>" + mine.name + "</b>";
    mineHtml += "<br />" + mine.location.string;
    mineHtml += "<br /><a href='" + mine.url + "'>" + mine.url + "</a>";
    return mineHtml;
  }

  return {
    init: init
  }
};

document.addEventListener("DOMContentLoaded", function() {
  mineMiner().init();
});
