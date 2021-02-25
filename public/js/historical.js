const renderChart = (dataSrcUrl, targetContainerElementId, heading) => {
  fetch(dataSrcUrl).then(r => r.text()).then((dataStr) => {
    const data = JSON.parse(dataStr);
    console.log(data);
    const chart = anychart.line(data);
    chart.title(heading);
    chart.container(targetContainerElementId);
    chart.draw();
  });
}

renderChart(
  'http://localhost:8080/data/historical_total_loc.json',
  'totalLoc',
  "Total lines of code over time"
)

renderChart(
  'http://localhost:8080/data/historical_ratios.json',
  'ratios',
  "Ratio of test code to application code"
  )

renderChart(
  'http://localhost:8080/data/historical_large_files.json',
  'largeFiles',
  "Number of large files over time"
  )

renderChart(
  'http://localhost:8080/data/historical_eslint_ignores.json',
  'eslintIgnores',
  "Number of eslint ignores over time"
  )

