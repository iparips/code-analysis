fetch('http://localhost:8080/data/file_hierarchy_by_size.json').then(r => r.text()).then((data) => {
  console.log("fetched data: ", JSON.parse(data));
  const chart = anychart.treeMap(JSON.parse(data), "as-tree");
  chart.maxDepth(3);
  chart.hintDepth(1);
  chart.title("Treemap by file size");
  chart.container("container");

  chart.tooltip().format(function () {
    const size = this.getData('loc') ? "Size: " + this.getData('loc') + " LoC" : ""
    const branchCoverage = this.getData("branchCoverage") ?
      "\nBranch Coverage: " + this.getData("branchCoverage") : ""
    const complexity = this.getData("complexity") ?
      "\nComplexity Violations: " + this.getData("complexityMessages") : ""

    return size + branchCoverage + complexity
  });

  chart.draw();
});
