const request = new Request('http://localhost:8080/data/historical_ratios.json');
fetch(request).then(r => r.text()).then((dataStr) => {
  const data = JSON.parse(dataStr);
  console.log(data);
  const chart = anychart.line(data);
  chart.title("Ratio of test code to application code");
  chart.container("container");
  chart.draw();
});
