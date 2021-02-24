fetch('http://localhost:8080/data/file_hierarchy_by_complexity.json').then(r => r.text()).then((data) => {
  console.log("fetched data: ", JSON.parse(data));
  const chart = anychart.treeMap(JSON.parse(data), "as-tree");
  chart.maxDepth(3);
  chart.hintDepth(1);
  chart.title("Treemap by complexity");
  chart.container("container");

  chart.tooltip().format(function () {
    const size = this.getData('loc') ? "Size: " + this.getData('loc') + " LoC" : ""
    const branchCoverage = this.getData("branchCoverage") ?
      "\nBranch Coverage: " + this.getData("branchCoverage") : ""
    return size + branchCoverage
  });

  chart.draw();
});
