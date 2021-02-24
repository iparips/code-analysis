fetch('http://localhost:8080/data/historical_ratios.json').then(r => r.text()).then((dataStr) => {
  const data = JSON.parse(dataStr);
  console.log(data);
  const chart = anychart.line(data);
  chart.title("Ratio of test code to application code");
  chart.container("ratios");
  chart.draw();
});

fetch('http://localhost:8080/data/historical_large_files.json').then(r => r.text()).then((dataStr) => {
  const data = JSON.parse(dataStr);
  console.log(data);
  const chart = anychart.line(data);
  chart.title("Number of large files over time");
  chart.container("largeFiles");
  chart.draw();
});

fetch('http://localhost:8080/data/historical_eslint_ignores.json').then(r => r.text()).then((dataStr) => {
  const data = JSON.parse(dataStr);
  console.log(data);
  const chart = anychart.line(data);
  chart.title("Number of eslint ignores over time");
  chart.container("eslintIgnores");
  chart.draw();
});
