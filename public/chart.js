anychart.data.loadJsonFile("http://localhost:8080/pie_data.json", function (data) {
  // create a chart and set loaded data
  chart = anychart.bar(data);

  chart.title("Load JSON data and create a chart");
  chart.container("container");
  chart.draw();
});
