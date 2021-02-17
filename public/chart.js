anychart.onDocumentLoad(function () {
  // create an instance of a pie chart
  const chart = anychart.pie();
  // set the data
  chart.data([
    ["Chocolate", 5],
    ["Rhubarb compote", 2],
    ["Crêpe Suzette", 2],
    ["American blueberry", 2],
    ["Buttermilk", 1]
  ]);
  chart.title("Top 5 pancake fillings");
  chart.container("container");
  chart.draw();
});
