const request = new Request('http://localhost:8080/data/file_hierarchy_no_next.json');
fetch(request).then(r => r.text()).then((data) => {
  console.log("fetched data: ", JSON.parse(data));
  const chart = anychart.treeMap(JSON.parse(data), "as-tree");
  chart.maxDepth(3);
  chart.hintDepth(1);
  chart.title("Load JSON data and create a chart");
  chart.container("container");

  chart.tooltip().format(function () {
    const size = "Size: " + this.value + " LoC"
    const branchCoverage = this.getData("branchCoverage") ?
      "\nBranch Coverage: " + this.getData("branchCoverage") : ""
    const complexity = this.getData("complexity") ?
      "\nComplexity Violations: " + this.getData("complexity") : ""

    return size + branchCoverage + complexity
  });

  chart.draw();
});
