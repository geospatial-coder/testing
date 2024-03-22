var s2 = ee.ImageCollection("COPERNICUS/S2_SR")
        .filterBounds(roi)
      .filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE",5))
        .first()
        

Map.addLayer(s2.clip(roi))
print(s2)
function indexCalc (image){
  var ndvi = image.normalizedDifference(["B8","B4"]).rename("ndvi")
  var ndsi = image.normalizedDifference(["B8","B11"]).rename("ndsi")
  
  return ndvi.addBands(ndsi)
}

var ndsi = s2.normalizedDifference(["B8","B11"])

var stat = ndsi.reduceRegion({
    reducer: ee.Reducer.minMax(),
    geometry: roi,
    scale: 10
  });
print(stat)
var indices = indexCalc(s2)

Map.addLayer(ndsi,{min: -1,max:1,palette: ["red","green","blue"]})
