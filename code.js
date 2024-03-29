// // // First way to get the Feature Collection to extract raster pixels, creating a featurecollection via GEE API

// Hover to left top of map area and click the second icon of "Pointer Creation" 
// Click to the points you want to create and put unique id or names

// // // Second way, importing your would-be Feature Collection via a shapefile in your disk

// import ESRI shapefile via "Assets" tab, New -> Shapefile click. Upload shp, shx, prj, dbf files simultaneously. Be sure to have your shapefile in WGS 84 - UTM zone 35 N etc.
// Import this asset to your script, then add "var shp = shp.geometry();" as otherwise it would be left as Table.

// // //



// Define a raster of RS satellite, example from Sentinel 2 MSI level 1C

var raster = ee.Image("COPERNICUS/S2/20190319T090019_20190319T090154_T35TNE");

// Select bands of interest from your raster, here example from Sentinel 2 again

var wavelengths = ['B1','B2','B3','B4','B5','B6','B7','B8'];

// First step is chart creation, an easy visualization to see your data before getting into .csv

// Here I had 5 ids so I made 5 different colors accordingly, and color selection is obviously up to you, too.

var title = {
  title: 'TOA Sentinel 2',
  hAxis: {title: 'Band'},
  vAxis: {title: 'Radiance'},
    lineWidth: 1,
  pointSize: 4,
  series: {
            0: {color: 'FF0000'}, 
            1: {color: '000000'}, 
            2: {color: '0000FF'},
            3: {color: '1C5408'}, 
            4: {color: '0FECFB'}, 
}
};

// // Define a function to easily do your extraction with different rasters

// .select part, self-explanatory, selects specified bands from the satellite, which you define in previously "var wavelengths" part as well.
// in the parenthesis of "ui.Chart.image.regions" image3 is your wavelength picked raster, shp is your shapefile or FeatureCollection you want to extract pixel values accordingly
// ee.Reducer.mean() is reducer function for their region, you can use other reducer functions  https://developers.google.com/earth-engine/guides/reducers_intro
// 10 here is the spatial resolution of Sentinel-2 image, put it according to your raster
// id is the unique feature of your Feature Collection shp, 
// wavelengths at the last part define x-axis of the chart as well as the data you will get
// .setOptions(title) use the settings defined in "var title" above.
// last print function creates the chart at the Console part of the GEE API.


var func = function (image2) {
var image3 = image2.select('B1','B2','B3','B4','B5','B6','B7','B8');
var chart1 = ui.Chart.image.regions(
  image3, shp, ee.Reducer.mean(), 10,"id", wavelengths)
  .setChartType('ScatterChart')
    .setOptions(title);
 
print(chart1);
};


// The following line runs the function

func(raster);

// When you create the chart, at its right top there will be "Open in Another Window" button, when clicked expands it into another tab with choices of "Download as CSV" as well. 
// Through that you can download the data as a .csv file, as well as the chart as a PNG file in another button.
